/**
 * Server Action: seedOpportunities
 *
 * This action:
 * 1. Verifies admin password
 * 2. Seeds the database with initial April 2026 opportunities
 * 3. Returns count of added opportunities
 *
 * Use this at launch to populate opportunities
 */
'use server';

import { supabaseServer } from '@/lib/supabase';

interface SeedResponse {
  success: boolean;
  message: string;
  count?: number;
}

export async function seedOpportunities(adminPassword: string): Promise<SeedResponse> {
  try {
    // Verify admin password
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'skillalert2026';
    if (adminPassword !== correctPassword) {
      return {
        success: false,
        message: 'Incorrect admin password',
      };
    }

    // Initial seed data
    const opportunities = [
      {
        title: 'WeThinkCode GenAI for Developers',
        description:
          'Intensive GenAI development programme for those with coding experience. Multiple cohorts starting throughout April and May 2026. Learn AI generative models, API integration, and modern AI workflows.',
        category: 'Course',
        location_tags: ['Johannesburg', 'Gauteng', 'Other SA'],
        stipend_info: null,
        closing_date: '2026-05-04',
        official_link: 'https://ai-admissions.wethinkcode.co.za/',
        official_source: 'WeThinkCode',
        tags: ['AI', 'Tech Skills', 'Coding', 'Developers'],
      },
      {
        title: 'WeThinkCode GenAI Non-Technical (40-hour) for Professionals',
        description:
          'Accessible GenAI introduction for non-technical professionals. No coding needed. Understand AI concepts, applications in business, and practical use cases. Multiple cohorts: 13-17 Apr, 20-24 Apr, and more in May 2026.',
        category: 'Course',
        location_tags: ['Johannesburg', 'Gauteng', 'Other SA'],
        stipend_info: 'Free course',
        closing_date: '2026-05-04',
        official_link: 'https://www.wethinkcode.co.za/',
        official_source: 'WeThinkCode',
        tags: ['AI', 'Skills Training', 'Free', 'Non-Technical'],
      },
      {
        title: 'YES x Microsoft AI Skills Programme',
        description:
          'Free AI skills courses from YES (Youth Employment Service) in partnership with Microsoft. Limited certification vouchers available (50,000 worldwide). Industry-recognized credentials. Courses include AI fundamentals, data science, and cloud computing.',
        category: 'Course',
        location_tags: ['Johannesburg', 'Gauteng', 'Other SA'],
        stipend_info: 'Free courses + limited certification vouchers',
        closing_date: null,
        official_link: 'https://yes-aiskills.co.za/register/',
        official_source: 'YES x Microsoft',
        tags: ['AI', 'Microsoft', 'Free', 'Youth Programme', 'Tech Skills'],
      },
      {
        title: 'Services SETA Learnership Opportunities 2026',
        description:
          'Learnerships across multiple sectors: hospitality, retail, finance, logistics, tourism. Monthly stipends available. Gain work experience while earning. Various roles and locations available across South Africa.',
        category: 'Learnership',
        location_tags: ['Johannesburg', 'Gauteng', 'Other SA'],
        stipend_info: 'Monthly stipend (varies by sector and role)',
        closing_date: '2026-06-30',
        official_link: 'https://servicesseta.org.za/learners/',
        official_source: 'Services SETA',
        tags: ['Learnership', 'Stipend', 'Work Experience', 'Government'],
      },
      {
        title: 'SAYouth.mobi — Jobs & Skilling Opportunities',
        description:
          'Daily updated job board with employment and skilling opportunities across South Africa. Browse entry-level jobs, internships, and skills programmes. Real employers, real opportunities. Updated continuously with new postings.',
        category: 'Job',
        location_tags: ['Johannesburg', 'Gauteng', 'Other SA'],
        stipend_info: null,
        closing_date: null,
        official_link: 'https://sayouth.mobi/',
        official_source: 'SAYouth.mobi',
        tags: ['Jobs', 'Entry-Level', 'Skilling', 'Daily Updated'],
      },
      {
        title: 'NYDA Business Support & Youth Development Programmes',
        description:
          'National Youth Development Agency support for young entrepreneurs and job seekers. Business grants, training, and mentorship. Youth development initiatives across South Africa.',
        category: 'GovProgram',
        location_tags: ['Johannesburg', 'Gauteng', 'Other SA'],
        stipend_info: 'Grants and funding available',
        closing_date: null,
        official_link: 'https://www.nyda.gov.za/',
        official_source: 'NYDA',
        tags: ['Government', 'Youth', 'Support', 'Entrepreneurship'],
      },
    ];

    // Insert opportunities
    const { error, data } = await supabaseServer
      .from('opportunities')
      .insert(opportunities)
      .select();

    if (error) {
      console.error('Seed error:', error);
      return {
        success: false,
        message: `Failed to seed opportunities: ${error.message}`,
      };
    }

    return {
      success: true,
      message: `Successfully seeded ${data?.length || opportunities.length} opportunities!`,
      count: data?.length || opportunities.length,
    };
  } catch (error) {
    console.error('Seed action error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
