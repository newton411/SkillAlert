import { SignUpForm } from '@/components/sign-up-form';

/**
 * Landing Page - Dribbble-inspired Design
 * 
 * Layout:
 * 1. Clean navigation bar
 * 2. Bold, centered hero section with headline + subheadline + CTA
 * 3. Sign-up form prominently positioned
 * 4. 4 core benefit cards (Why SkillAlert SA)
 * 5. Simple footer with trust elements
 * 
 * Design principles: Mobile-first, clean spacing, strong trust signals
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            SkillAlert SA
          </h1>
          <a href="#signup" className="text-blue-600 font-semibold hover:text-blue-700 transition">
            Sign Up
          </a>
        </div>
      </nav>

      {/* Hero Section - Bold and Centered */}
      <section className="px-4 py-20 md:py-32 bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Never miss a job, learnership, or free upskilling opportunity again
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
            Get personalized, scam-safe alerts for real SA opportunities sent straight to your WhatsApp or SMS — completely free.
          </p>

          {/* Trust Badge */}
          <div className="inline-block px-4 py-2 bg-green-50 border border-green-200 rounded-full mb-8">
            <p className="text-sm font-semibold text-green-700">
              ✓ Protected • POPIA Compliant • No spam, unsubscribe anytime
            </p>
          </div>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#signup"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition text-lg shadow-lg hover:shadow-xl"
            >
              Sign Up for Free
            </a>
            <span className="text-gray-600 text-sm">Takes less than 2 minutes</span>
          </div>

          {/* Mobile Icon */}
          <div className="mt-12 flex justify-center">
            <div className="text-5xl animate-bounce">📱</div>
          </div>
        </div>
      </section>

      {/* Why SkillAlert SA - 4 Core Benefits */}
      <section className="px-4 py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why SkillAlert SA is Different</h2>
          <p className="text-center text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
            Smarter than eJoobi, JOBJACK, email alerts, and random WhatsApp groups.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Benefit 1: One-time Sign-up */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="text-4xl mb-4">⏱️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">One-Time Sign-Up</h3>
              <p className="text-gray-600">
                Sign up once on this page. Passive WhatsApp/SMS alerts flow to you—no checking portals, no email newsletters, no joining groups.
              </p>
            </div>

            {/* Benefit 2: Scam Protection */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Scam-Safe by Design</h3>
              <p className="text-gray-600">
                Every alert includes: "Always verify ONLY on the official website. Never pay money or share banking details for a job."
              </p>
            </div>

            {/* Benefit 3: AI Explanation */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Smarter Alerts</h3>
              <p className="text-gray-600">
                AI explains WHY it matches you: "This learnership has a stipend and is in Johannesburg, matching your interests and skill level."
              </p>
            </div>

            {/* Benefit 4: Everything Covered */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Everything Covered</h3>
              <p className="text-gray-600">
                Jobs, stipended learnerships, free courses (WeThinkCode GenAI, YES Microsoft AI), and government youth programmes—all verified.
              </p>
            </div>
          </div>

          {/* Trust Line - Emphasized */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-8 rounded-xl text-center">
            <p className="text-lg font-semibold mb-2">
              ✓ Built in South Africa  •  POPIA Compliant  •  Official-links Only
            </p>
            <p className="text-sm opacity-90">
              Helping Johannesburg & Gauteng job seekers beat 32% unemployment with verified opportunities only
            </p>
          </div>
        </div>
      </section>

      {/* Original Trust Signals */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">What You Get</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Signal 1 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="text-4xl mb-4">✅</div>
              <h4 className="text-xl font-semibold mb-3">Completely Free</h4>
              <p className="text-gray-600">
                No hidden fees, no paid upgrades. All opportunities are screened and legitimate.
              </p>
            </div>

            {/* Signal 2 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="text-xl font-semibold mb-3">Personalized for You</h4>
              <p className="text-gray-600">
                Tell us your interests and location — we send only what matches your goals.
              </p>
            </div>

            {/* Signal 3 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="text-4xl mb-4">🇿🇦</div>
              <h4 className="text-xl font-semibold mb-3">Real SA Opportunities</h4>
              <p className="text-gray-600">
                Jobs, learnerships, and training from trusted employers and government programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities Covered */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <h3 className="text-3xl font-bold text-center mb-12">Opportunities We Help With</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4">
            <span className="text-2xl">💼</span>
            <div>
              <h4 className="font-semibold text-lg mb-2">Entry-Level Jobs</h4>
              <p className="text-gray-600">Retail, admin, customer service, and more</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-2xl">🎓</span>
            <div>
              <h4 className="font-semibold text-lg mb-2">Learnerships with Stipends</h4>
              <p className="text-gray-600">SETA and employer-sponsored programs</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-2xl">💻</span>
            <div>
              <h4 className="font-semibold text-lg mb-2">Tech & Coding Skills</h4>
              <p className="text-gray-600">GenAI, web dev, and digital skills training</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-2xl">🏛️</span>
            <div>
              <h4 className="font-semibold text-lg mb-2">Government Programs</h4>
              <p className="text-gray-600">Youth initiatives and free upskilling courses</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sign-up CTA */}
      <section className="bg-blue-600 text-white py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h3 className="text-3xl font-bold mb-4">Ready to Stop Missing Out?</h3>
          <p className="text-lg mb-8 opacity-90">
            Get started in less than 2 minutes. We'll send you personalized alerts every week.
          </p>
          <a
            href="#signup"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Sign Up Free
          </a>
        </div>
      </section>

      {/* Sign-up Form */}
      <SignUpForm />

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="border-t border-gray-700 pt-8">
            <p className="text-center mb-2 font-semibold text-blue-400">
              ✓ Built in South Africa • POPIA Compliant • Helping Johannesburg & Gauteng job seekers beat 32% unemployment
            </p>
            <p className="text-center text-sm">&copy; 2026 SkillAlert SA. All opportunities verified and from official sources.</p>
            <p className="text-center text-sm mt-2">
              Our commitment: <strong>"Always apply ONLY on official websites. Never pay for a job or share banking details."</strong>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
