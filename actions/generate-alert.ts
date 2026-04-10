/**
 * Server Action: generateAlert
 *
 * This action:
 * 1. Fetches user profile and opportunity from Supabase
 * 2. Calls OpenAI/Groq API to generate a personalized WhatsApp message
 * 3. Returns the generated alert message
 *
 * SECURITY: Service role key used server-side only
 * AI API keys never exposed to client
 */
'use server';

import { supabaseServer } from '@/lib/supabase';

interface AlertGenerationResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Generate a personalized alert message using AI
 *
 * The AI receives:
 * - User profile (name, interests, skill level, location)
 * - Opportunity details (title, description, category, etc.)
 *
 * It outputs a warm, WhatsApp-style message that:
 * 1. Explains WHY this matches the user
 * 2. Includes the official link
 * 3. Ends with our scam disclaimer
 */
export async function generateAlert(
  userId: string,
  opportunityId: string
): Promise<AlertGenerationResponse> {
  try {
    // 1. Fetch user profile
    const { data: user, error: userError } = await supabaseServer
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    // 2. Fetch opportunity
    const { data: opportunity, error: oppError } = await supabaseServer
      .from('opportunities')
      .select('*')
      .eq('id', opportunityId)
      .single();

    if (oppError || !opportunity) {
      return {
        success: false,
        error: 'Opportunity not found',
      };
    }

    // 3. Build AI prompt
    const interests = (user.interests || []).join(', ');
    const locationName = user.location
      .replace('_', ' ')
      .replace(/\b\w/g, (c: string) => c.toUpperCase());

    const prompt = `You are a friendly WhatsApp alert generator for SkillAlert SA, a South African job alert service.

Generate a SHORT, warm, WhatsApp-style message (2-3 sentences max) for this person:
- Name: ${user.name}
- Location: ${locationName}
- Interests: ${interests}
- Skill Level: ${user.skill_level}

About this opportunity:
- Title: ${opportunity.title}
- Category: ${opportunity.category}
- Description: ${opportunity.description}
- Locations: ${(opportunity.location_tags || []).join(', ')}
${opportunity.stipend_info ? `- Stipend Info: ${opportunity.stipend_info}` : ''}
${opportunity.closing_date ? `- Closing Date: ${opportunity.closing_date}` : ''}
- Official Link: ${opportunity.official_link}

Your message should:
1. Address them by first name warmly
2. Briefly explain WHY this matches them (reference their interests/location/skill level)
3. Include the official link
4. Be casual and friendly (like a WhatsApp from a friend)
5. End EXACTLY with this disclaimer on a new line:

"This is a curated alert from SkillAlert SA. Always verify and apply ONLY on the official website link below. Never pay any money or share banking details for a job."

Example style:
"Hi Thabo, a new Services SETA learnership with monthly stipend just opened in Johannesburg that matches your interest in skills training and beginner level. Apply here: [link]. Deadline soon!

This is a curated alert from SkillAlert SA. Always verify and apply ONLY on the official website link below. Never pay any money or share banking details for a job."

Now generate the message for this person and opportunity. MUST end with the disclaimer.`;

    // 4. Call AI API (OpenAI or Groq)
    const useGroq = !!process.env.GROQ_API_KEY && !process.env.OPENAI_API_KEY;

    let aiMessage = '';

    if (useGroq) {
      // Use Groq API (free, fast)
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'mixtral-8x7b-32768',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 300,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Groq API error:', data);
        return {
          success: false,
          error: 'Failed to generate alert with AI',
        };
      }

      aiMessage = data.choices[0].message.content;
    } else if (process.env.OPENAI_API_KEY) {
      // Use OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 300,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('OpenAI API error:', data);
        return {
          success: false,
          error: 'Failed to generate alert with AI',
        };
      }

      aiMessage = data.choices[0].message.content;
    } else {
      return {
        success: false,
        error: 'No AI API key configured. Set OPENAI_API_KEY or GROQ_API_KEY',
      };
    }

    // 5. Return the generated message
    return {
      success: true,
      message: aiMessage,
    };
  } catch (error) {
    console.error('Alert generation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error in alert generation',
    };
  }
}
