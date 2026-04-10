/**
 * Server Action: handleSignUp
 * 
 * This runs ONLY on the server and:
 * 1. Validates form data with Zod
 * 2. Inserts user into Supabase using service_role key
 * 3. Returns success/error to client
 * 
 * SECURITY: Never expose service_role key to client
 */
'use server';

import { supabaseServer } from '@/lib/supabase';
import { signUpSchema, SignUpFormData } from '@/lib/validations';

interface SignUpResponse {
  success: boolean;
  message: string;
  error?: string;
}

export async function handleSignUp(data: SignUpFormData): Promise<SignUpResponse> {
  try {
    // 1. Validate data with Zod
    const validatedData = signUpSchema.parse(data);

    // 2. Insert into Supabase users table (service_role key used on server)
    const { error } = await supabaseServer
      .from('users')
      .insert([
        {
          name: validatedData.name,
          phone: validatedData.phone,
          location: validatedData.location,
          interests: validatedData.interests,
          skill_level: validatedData.skillLevel,
          consent: validatedData.consent,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error('Supabase error:', error);
      
      // Check if phone already exists
      if (error.code === '23505') {
        return {
          success: false,
          message: 'This phone number is already registered',
          error: 'Phone already exists',
        };
      }

      return {
        success: false,
        message: 'Failed to sign up. Please try again.',
        error: error.message,
      };
    }

    // 3. Success
    return {
      success: true,
      message: 'You will start receiving alerts soon! Check your messages for a welcome alert.',
    };
  } catch (error) {
    console.error('Sign-up error:', error);
    return {
      success: false,
      message: 'An error occurred. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
