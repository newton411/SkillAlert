/**
 * SignUpForm Component
 * 
 * Features:
 * - Uses react-hook-form + Zod for validation
 * - shadcn/ui form components
 * - Server Action for submission (no API route)
 * - Loading and error handling
 * - Mobile-first responsive design
 */
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { handleSignUp } from '@/actions/sign-up';
import {
  signUpSchema,
  SignUpFormData,
  INTEREST_OPTIONS,
  LOCATION_OPTIONS,
  SKILL_LEVEL_OPTIONS,
} from '@/lib/validations';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      interests: [],
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await handleSignUp(data);

      if (response.success) {
        setSuccessMessage(response.message);
        reset();
        // Scroll or show success state
        setTimeout(() => {
          setSuccessMessage('');
        }, 8000);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="signup" className="max-w-2xl mx-auto px-4 py-16 md:py-24">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-sm">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Sign Up for Free Alerts</h2>
        <p className="text-gray-600 mb-8">
          Tell us about yourself and we'll start sending personalized opportunities to your WhatsApp.
        </p>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3 items-start">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900">Success!</h3>
              <p className="text-green-800">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3 items-start">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900">Error</h3>
              <p className="text-red-800">{errorMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Full Name *
            </label>
            <input
              {...register('name')}
              type="text"
              placeholder="e.g., Thabo Mthembu"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              WhatsApp Phone Number *
            </label>
            <input
              {...register('phone')}
              type="tel"
              placeholder="+27 123 456 789"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              disabled={isLoading}
            />
            <p className="text-gray-600 text-xs mt-1">
              We'll send alerts here. Include country code (+27) or use 0 prefix.
            </p>
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Location *
            </label>
            <select
              {...register('location')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              disabled={isLoading}
            >
              <option value="">Select your location...</option>
              {LOCATION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.location && (
              <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>
            )}
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              What are you interested in? *
            </label>
            <div className="space-y-2">
              {INTEREST_OPTIONS.map((interest) => (
                <label key={interest} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    value={interest}
                    {...register('interests')}
                    className="w-4 h-4 border-gray-300 rounded"
                    disabled={isLoading}
                  />
                  <span className="text-gray-700">{interest}</span>
                </label>
              ))}
            </div>
            {errors.interests && (
              <p className="text-red-600 text-sm mt-2">{errors.interests.message}</p>
            )}
          </div>

          {/* Skill Level */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Your Skill Level *
            </label>
            <select
              {...register('skillLevel')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              disabled={isLoading}
            >
              <option value="">Select your skill level...</option>
              {SKILL_LEVEL_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.skillLevel && (
              <p className="text-red-600 text-sm mt-1">{errors.skillLevel.message}</p>
            )}
          </div>

          {/* Consent Checkbox */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register('consent')}
                className="w-4 h-4 border-gray-300 rounded mt-1"
                disabled={isLoading}
              />
              <span className="text-sm text-gray-700">
                <span className="font-semibold">I consent to receive WhatsApp/SMS alerts</span> (POPIA compliant). I can unsubscribe anytime by replying STOP. I understand this is opt-in only. *
              </span>
            </label>
            {errors.consent && (
              <p className="text-red-600 text-sm mt-2">{errors.consent.message}</p>
            )}
            
            {/* Safety Note */}
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">Your data is safe.</span> You will only receive verified opportunities from official sources. <strong>Unsubscribe anytime with one reply.</strong> We never sell your data.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400 transition flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoading ? 'Signing up...' : 'Start Getting Alerts'}
          </button>

          <p className="text-center text-xs text-gray-600">
            🔒 Your data is safe. We take privacy seriously. Never spam.
          </p>
        </form>
      </div>
    </section>
  );
}
