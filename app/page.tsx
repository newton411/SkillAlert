import { SignUpForm } from '@/components/sign-up-form';

/**
 * Landing Page
 * - Hero section with value proposition
 * - Trust signals (why users should sign up)
 * - Call-to-action to sign-up form
 * - Full sign-up form with validation
 * 
 * Mobile-first design with Tailwind
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">SkillAlert SA</h1>
          <a href="#signup" className="text-blue-600 font-semibold hover:text-blue-700">
            Sign Up
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Never miss a job, learnership, or free upskilling opportunity again
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get personalized alerts for real SA opportunities sent to your WhatsApp or phone — completely free.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Jobs, learnerships, government programs, and skills training — all curated for what you're looking for.
            </p>
            <a
              href="#signup"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition text-lg"
            >
              Start Getting Alerts
            </a>
          </div>

          {/* Hero Visual */}
          <div className="hidden md:flex justify-center">
            <div className="bg-blue-100 w-full aspect-square rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📱</div>
                <p className="text-gray-700 font-semibold">Alerts delivered to your phone</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why SkillAlert SA? - Differentiators Section */}
      <section className="bg-blue-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">Why SkillAlert SA is Different</h3>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Better than eJoobi, JOBJACK, email alerts, and random WhatsApp group spamming. Here's how:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Differentiator 1 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-blue-200">
              <div className="text-4xl mb-4">⏱️</div>
              <h4 className="text-xl font-semibold mb-3">One-Time Sign-up, Real Alerts Forever</h4>
              <p className="text-gray-600">
                No WhatsApp groups to join. No email newsletters to find. Just sign up once on this page—we push alerts directly to your phone. You control everything.
              </p>
            </div>

            {/* Differentiator 2 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-blue-200">
              <div className="text-4xl mb-4">🛡️</div>
              <h4 className="text-xl font-semibold mb-3">Scam-Safe by Design</h4>
              <p className="text-gray-600">
                Every alert includes our clear disclaimer: "Always verify ONLY on the official website. Never pay money or share banking details for a job." Official-links-only policy.
              </p>
            </div>

            {/* Differentiator 3 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-blue-200">
              <div className="text-4xl mb-4">🤖</div>
              <h4 className="text-xl font-semibold mb-3">AI That Explains WHY It Matches You</h4>
              <p className="text-gray-600">
                Not just a link. Our AI explains: "This learnership matches your interests AND has a stipend for your location." You get context, not spam.
              </p>
            </div>

            {/* Differentiator 4 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-blue-200">
              <div className="text-4xl mb-4">🌐</div>
              <h4 className="text-xl font-semibold mb-3">Everything in One Place</h4>
              <p className="text-gray-600">
                Jobs, learnerships with stipends, free upskilling (WeThinkCode GenAI, YES Microsoft AI), and government youth programs (NYDA, EPWP, etc.)—all verified.
              </p>
            </div>

            {/* Differentiator 5 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-blue-200">
              <div className="text-4xl mb-4">📱</div>
              <h4 className="text-xl font-semibold mb-3">No Portal to Keep Checking</h4>
              <p className="text-gray-600">
                Unlike portals and dashboards, our alerts come to you. Check your messages when you want—no subscriptions, no logins, no FOMO.
              </p>
            </div>

            {/* Differentiator 6 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-blue-200">
              <div className="text-4xl mb-4">🔐</div>
              <h4 className="text-xl font-semibold mb-3">Your Data is Safe</h4>
              <p className="text-gray-600">
                POPIA compliant storage. You control your preferences. Unsubscribe anytime with a single reply. Your data is never sold.
              </p>
            </div>
          </div>

          {/* Trust Line */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg text-center">
            <p className="text-sm md:text-base font-medium">
              ✓ Built in South Africa • POPIA Compliant • Helping Johannesburg & Gauteng job seekers fight 32% unemployment
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
