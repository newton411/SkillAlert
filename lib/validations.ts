/**
 * Validation schema for sign-up form
 * Uses Zod for type-safe runtime validation
 */
import { z } from 'zod';

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),

  phone: z
    .string()
    .regex(
      /^(\+27|0)[0-9]{9}$/,
      'Please enter a valid South African phone number (e.g., +27123456789 or 0123456789)'
    ),

  location: z
    .enum(['johannesburg', 'gauteng', 'other_sa'], {
      errorMap: () => ({ message: 'Please select a valid location' }),
    }),

  interests: z
    .array(z.string())
    .min(1, 'Please select at least one interest')
    .max(11, 'Please select a maximum of 11 interests'),

  skillLevel: z
    .enum(['beginner', 'some_coding', 'intermediate'], {
      errorMap: () => ({ message: 'Please select a skill level' }),
    }),

  consent: z
    .boolean()
    .refine(
      (val) => val === true,
      'You must consent to receive alerts to sign up'
    ),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

// Available interest options
export const INTEREST_OPTIONS = [
  'Any Entry-Level Jobs',
  'Learnerships with Stipend',
  'Government Youth Programmes',
  'Retail / Customer Service',
  'Admin / Office Work',
  'Healthcare Support',
  'Logistics / Driving',
  'AI & Tech Skills',
  'Coding & Digital Skills',
  'Other Skills Training',
];

export const LOCATION_OPTIONS = [
  { value: 'johannesburg', label: 'Johannesburg' },
  { value: 'gauteng', label: 'Gauteng (Other)' },
  { value: 'other_sa', label: 'Other SA Province' },
];

export const SKILL_LEVEL_OPTIONS = [
  { value: 'beginner', label: 'Beginner (no experience)' },
  { value: 'some_coding', label: 'Some basic coding knowledge' },
  { value: 'intermediate', label: 'Intermediate' },
];

/**
 * Validation schema for adding opportunities (admin only)
 */
export const opportunitySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.enum(['Job', 'Learnership', 'Course', 'GovProgram']),
  location_tags: z.array(z.string()).min(1, 'Select at least one location'),
  stipend_info: z.string().optional(),
  closing_date: z.string().optional(),
  official_link: z.string().url('Must be a valid URL'),
  official_source: z.string().min(2, 'Official source required (e.g., WeThinkCode, YES Microsoft)'),
  tags: z.array(z.string()).default([]),
});

export type OpportunityFormData = z.infer<typeof opportunitySchema>;

/**
 * Validation schema for alert generation
 */
export const alertGenerationSchema = z.object({
  userId: z.string().uuid('Invalid user ID'),
  opportunityId: z.string().uuid('Invalid opportunity ID'),
});
