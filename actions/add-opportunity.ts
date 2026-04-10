/**
 * Server Action: addOpportunity
 *
 * This action:
 * 1. Validates admin access with password
 * 2. Validates opportunity data with Zod
 * 3. Inserts opportunity into Supabase
 * 4. Returns success/error
 *
 * SECURITY: Admin password is checked server-side only
 */
'use server';

import { supabaseServer } from '@/lib/supabase';
import { opportunitySchema, OpportunityFormData } from '@/lib/validations';

interface AddOpportunityResponse {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Add a new opportunity to the database
 * Requires admin authentication via password
 */
export async function addOpportunity(
  formData: OpportunityFormData,
  adminPassword: string
): Promise<AddOpportunityResponse> {
  try {
    // 1. Verify admin password
    const correctPassword = process.env.ADMIN_PASSWORD || 'skillalert2026';
    if (adminPassword !== correctPassword) {
      return {
        success: false,
        message: 'Incorrect admin password',
        error: 'Invalid credentials',
      };
    }

    // 2. Validate form data
    const validatedData = opportunitySchema.parse(formData);

    // 3. Insert into Supabase
    const { error } = await supabaseServer.from('opportunities').insert([
      {
        title: validatedData.title,
        description: validatedData.description,
        category: validatedData.category,
        location_tags: validatedData.location_tags,
        stipend_info: validatedData.stipend_info || null,
        closing_date: validatedData.closing_date || null,
        official_link: validatedData.official_link,
        official_source: validatedData.official_source,
        tags: validatedData.tags || [],
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Supabase error:', error);
      return {
        success: false,
        message: 'Failed to add opportunity',
        error: error.message,
      };
    }

    return {
      success: true,
      message: `Opportunity "${validatedData.title}" added successfully!`,
    };
  } catch (error) {
    console.error('Add opportunity error:', error);
    return {
      success: false,
      message: 'An error occurred. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
