import DashboardShell from "@/components/layout/DashboardShell";
import { CreditCard, Building2, Activity, Settings, Key, Mail, ShieldAlert } from "lucide-react";

const navItems = [
  { label: "Schools", href: "/super-admin/dashboard", icon: Building2 },
  { label: "Plans", href: "/super-admin/plans", icon: CreditCard },
  { label: "Usage", href: "/super-admin/usage", icon: Activity },
  { label: "Settings", href: "/super-admin/settings", icon: Settings },
];

const SuperAdminSettings = () => {
  return (
    <DashboardShell navItems={navItems} title="Platform Settings">
      <div className="space-y-6 max-w-4xl">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Global Configuration</h2>
          <p className="text-gray-500 text-sm mt-1">Manage API keys, email providers, and system-wide settings.</p>
        </div>

        {/* AI Configuration */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
            <Key className="w-5 h-5 text-gray-500" />
            <h3 className="font-bold text-gray-900">AI Provider Config (OpenAI)</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
              <input 
                type="password" 
                value="sk-proj-***********************************" 
                readOnly
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default Model</label>
              <select className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 outline-none focus:border-primary">
                <option>gpt-4o-mini</option>
                <option>gpt-4o</option>
                <option>gpt-3.5-turbo</option>
              </select>
            </div>
            <div className="pt-2 flex justify-end">
              <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Email Configuration */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
            <Mail className="w-5 h-5 text-gray-500" />
            <h3 className="font-bold text-gray-900">Email Service (Resend)</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sender Email</label>
              <input 
                type="email" 
                defaultValue="hello@classmind.ai" 
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 outline-none focus:border-primary" 
              />
            </div>
            <div className="pt-2 flex justify-end">
              <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center gap-3 bg-red-50 text-red-600">
            <ShieldAlert className="w-5 h-5" />
            <h3 className="font-bold">Danger Zone</h3>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Maintenance Mode</p>
                <p className="text-sm text-gray-500">Temporarily disable access for all non-admin users.</p>
              </div>
              <button className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-200 transition">
                Enable Maintenance Mode
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};

export default SuperAdminSettings;
