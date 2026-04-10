'use client';

/**
 * Admin Page (/admin)
 * This is a client-side only page that requires authentication
 *
 * Features:
 * 1. Password authentication (hardcoded: "skillalert2026")
 * 2. View all signed-up users
 * 3. View all opportunities
 * 4. Form to add new opportunities (requires official source field)
 * 5. Alert generator: select user + opportunity, generates AI sample message
 *
 * Mobile-first design with Tailwind
 */

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { addOpportunity } from '@/actions/add-opportunity';
import { generateAlert } from '@/actions/generate-alert';
import { seedOpportunities } from '@/actions/seed-opportunities';
import { AlertCircle, CheckCircle, Loader2, LogOut } from 'lucide-react';

// Mark this page as dynamic (never static) since it requires dynamic data
export const dynamic = 'force-dynamic';

interface User {
  id: string;
  name: string;
  phone: string;
  location: string;
  interests: string[];
  skill_level: string;
  created_at: string;
}

interface Opportunity {
  id: string;
  title: string;
  description: string;
  category: string;
  location_tags: string[];
  stipend_info?: string;
  closing_date?: string;
  official_link: string;
  official_source: string;
  created_at: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [users, setUsers] = useState<User[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'add-opp' | 'alert-gen'>('users');

  const [opportunityForm, setOpportunityForm] = useState({
    title: '',
    description: '',
    category: 'Job' as const,
    location_tags: [] as string[],
    stipend_info: '',
    closing_date: '',
    official_link: '',
    official_source: '',
    tags: [] as string[],
  });
  const [oppLoading, setOppLoading] = useState(false);
  const [oppMessage, setOppMessage] = useState('');
  const [oppError, setOppError] = useState('');

  const [selectedUser, setSelectedUser] = useState('');
  const [selectedOpp, setSelectedOpp] = useState('');
  const [generatedAlert, setGeneratedAlert] = useState('');
  const [alertLoading, setAlertLoading] = useState(false);
  const [alertError, setAlertError] = useState('');

  const [seedLoading, setSeedLoading] = useState(false);
  const [seedMessage, setSeedMessage] = useState('');

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (password === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'skillalert2026')) {
      setIsAuthenticated(true);
      setPassword('');
      // Load data
      await loadUsers();
      await loadOpportunities();
    } else {
      setPasswordError('Incorrect password');
    }
  };

  // Load users from Supabase
  const loadUsers = async () => {
    try {
      const { data, error } = await supabase.from('users').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  // Load opportunities from Supabase
  const loadOpportunities = async () => {
    try {
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setOpportunities(data || []);
    } catch (error) {
      console.error('Error loading opportunities:', error);
    }
  };

  // Handle add opportunity
  const handleAddOpportunity = async (e: React.FormEvent) => {
    e.preventDefault();
    setOppLoading(true);
    setOppError('');
    setOppMessage('');

    try {
      const response = await addOpportunity(opportunityForm, password);
      if (response.success) {
        setOppMessage(response.message);
        setOpportunityForm({
          title: '',
          description: '',
          category: 'Job',
          location_tags: [],
          stipend_info: '',
          closing_date: '',
          official_link: '',
          official_source: '',
          tags: [],
        });
        // Reload opportunities
        await loadOpportunities();
        setTimeout(() => setOppMessage(''), 5000);
      } else {
        setOppError(response.message);
      }
    } catch (error) {
      setOppError('An error occurred');
      console.error(error);
    } finally {
      setOppLoading(false);
    }
  };

  // Handle location tag toggle
  const toggleLocationTag = (tag: string) => {
    const updated = opportunityForm.location_tags.includes(tag)
      ? opportunityForm.location_tags.filter((t) => t !== tag)
      : [...opportunityForm.location_tags, tag];
    setOpportunityForm({ ...opportunityForm, location_tags: updated });
  };

  // Handle generate alert
  const handleGenerateAlert = async () => {
    if (!selectedUser || !selectedOpp) {
      setAlertError('Please select both a user and opportunity');
      return;
    }

    setAlertLoading(true);
    setAlertError('');
    setGeneratedAlert('');

    try {
      const response = await generateAlert(selectedUser, selectedOpp);
      if (response.success && response.message) {
        setGeneratedAlert(response.message);
      } else {
        setAlertError(response.error || 'Failed to generate alert');
      }
    } catch (error) {
      setAlertError('Error generating alert');
      console.error(error);
    } finally {
      setAlertLoading(false);
    }
  };

  // Handle seed database
  const handleSeedDatabase = async () => {
    setSeedLoading(true);
    setSeedMessage('');

    try {
      const response = await seedOpportunities(password);
      if (response.success) {
        setSeedMessage(`✅ ${response.message}`);
        await loadOpportunities();
        setTimeout(() => setSeedMessage(''), 5000);
      } else {
        setSeedMessage(`❌ ${response.message}`);
      }
    } catch (error) {
      setSeedMessage('Error seeding database');
      console.error(error);
    } finally {
      setSeedLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">SkillAlert Admin</h1>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Admin Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                {passwordError && <p className="text-red-600 text-sm mt-2">{passwordError}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Access Admin
              </button>
            </form>

            <p className="text-center text-xs text-gray-600 mt-6">🔒 Secured access only</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">SkillAlert Admin</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 flex-wrap">
          {[
            { key: 'users', label: '👥 Users' },
            { key: 'add-opp', label: '➕ Add Opportunity' },
            { key: 'alert-gen', label: '🤖 Generate Alert' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-3 font-semibold transition ${
                activeTab === tab.key
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Registered Users <span className="text-blue-600">({users.length})</span>
              </h2>
              <button
                onClick={handleSeedDatabase}
                disabled={seedLoading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-green-400 transition flex items-center gap-2 text-sm"
              >
                {seedLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {seedLoading ? 'Seeding...' : '🌱 Seed DB'}
              </button>
            </div>

            {seedMessage && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                {seedMessage}
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Phone</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Location</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Interests</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Signed Up</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-900 font-semibold">{user.name}</td>
                      <td className="px-4 py-3 text-gray-600">{user.phone}</td>
                      <td className="px-4 py-3 text-gray-600">{user.location}</td>
                      <td className="px-4 py-3 text-gray-600 text-xs">
                        <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {user.interests?.length || 0} interests
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-xs">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-600">
              <strong>Total Users:</strong> {users.length}
            </div>
          </div>
        )}

        {/* Add Opportunity Tab */}
        {activeTab === 'add-opp' && (
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Opportunity</h2>

            {oppMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-green-800">{oppMessage}</p>
              </div>
            )}

            {oppError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-800">{oppError}</p>
              </div>
            )}

            <form onSubmit={handleAddOpportunity} className="space-y-6 bg-white p-8 rounded-lg border border-gray-200">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Title *</label>
                <input
                  type="text"
                  value={opportunityForm.title}
                  onChange={(e) => setOpportunityForm({ ...opportunityForm, title: e.target.value })}
                  placeholder="e.g., WeThinkCode GenAI for Developers"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Description *</label>
                <textarea
                  value={opportunityForm.description}
                  onChange={(e) => setOpportunityForm({ ...opportunityForm, description: e.target.value })}
                  placeholder="Full details about the opportunity"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Category *</label>
                <select
                  value={opportunityForm.category}
                  onChange={(e) => setOpportunityForm({ ...opportunityForm, category: e.target.value as any })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option>Job</option>
                  <option>Learnership</option>
                  <option>Course</option>
                  <option>GovProgram</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Locations *</label>
                <div className="space-y-2">
                  {['Johannesburg', 'Gauteng', 'Other SA'].map((loc) => (
                    <label key={loc} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={opportunityForm.location_tags.includes(loc)}
                        onChange={() => toggleLocationTag(loc)}
                        className="w-4 h-4 border-gray-300 rounded"
                      />
                      <span className="text-gray-700">{loc}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Official Link *</label>
                <input
                  type="url"
                  value={opportunityForm.official_link}
                  onChange={(e) => setOpportunityForm({ ...opportunityForm, official_link: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Official Source *</label>
                <input
                  type="text"
                  value={opportunityForm.official_source}
                  onChange={(e) => setOpportunityForm({ ...opportunityForm, official_source: e.target.value })}
                  placeholder="e.g., WeThinkCode, YES Microsoft, SETA, SAYouth.mobi"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Stipend Info (optional)</label>
                <input
                  type="text"
                  value={opportunityForm.stipend_info}
                  onChange={(e) => setOpportunityForm({ ...opportunityForm, stipend_info: e.target.value })}
                  placeholder="e.g., Monthly R3,500 stipend"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Closing Date (optional)</label>
                <input
                  type="date"
                  value={opportunityForm.closing_date}
                  onChange={(e) => setOpportunityForm({ ...opportunityForm, closing_date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={oppLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400 transition flex items-center justify-center gap-2"
              >
                {oppLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {oppLoading ? 'Adding...' : 'Add Opportunity'}
              </button>
            </form>
          </div>
        )}

        {/* Generate Alert Tab */}
        {activeTab === 'alert-gen' && (
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Generate Sample Alert</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Selectors */}
              <div className="space-y-6 bg-white p-8 rounded-lg border border-gray-200 h-fit">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Select a User *</label>
                  <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Choose a user...</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.location})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Select an Opportunity *</label>
                  <select
                    value={selectedOpp}
                    onChange={(e) => setSelectedOpp(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Choose an opportunity...</option>
                    {opportunities.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.title}
                      </option>
                    ))}
                  </select>
                </div>

                {alertError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-red-800 text-sm">{alertError}</p>
                  </div>
                )}

                <button
                  onClick={handleGenerateAlert}
                  disabled={alertLoading || !selectedUser || !selectedOpp}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400 transition flex items-center justify-center gap-2"
                >
                  {alertLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {alertLoading ? 'Generating...' : 'Generate Alert'}
                </button>
              </div>

              {/* Preview */}
              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">📱 WhatsApp Message Preview</h3>
                {generatedAlert ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 whitespace-pre-wrap text-sm text-gray-700 font-mono">
                    {generatedAlert}
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm">Select a user and opportunity, then click Generate Alert to see the preview here.</p>
                )}
              </div>
            </div>

            {/* Opportunities List */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Available Opportunities <span className="text-blue-600">({opportunities.length})</span>
              </h3>
              <div className="space-y-3">
                {opportunities.slice(0, 5).map((opp) => (
                  <div key={opp.id} className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{opp.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">
                          <span className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded mr-2">
                            {opp.category}
                          </span>
                          <span className="inline-block bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                            {opp.official_source}
                          </span>
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedOpp(opp.id)}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
