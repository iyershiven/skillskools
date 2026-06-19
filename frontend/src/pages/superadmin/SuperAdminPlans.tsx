import DashboardShell from "@/components/layout/DashboardShell";
import { CreditCard, Check, Building2, Activity, Settings } from "lucide-react";

const navItems = [
  { label: "Schools", href: "/super-admin/dashboard", icon: Building2 },
  { label: "Plans", href: "/super-admin/plans", icon: CreditCard },
  { label: "Usage", href: "/super-admin/usage", icon: Activity },
  { label: "Settings", href: "/super-admin/settings", icon: Settings },
];

const plans = [
  {
    name: "Starter",
    price: "₹75,000",
    period: "/year",
    activeSchools: 18,
    color: "bg-blue-50 text-blue-700 border-blue-200",
    features: [
      "Up to 500 students",
      "AI Tutor (1,000 queries/month)",
      "Basic school analytics",
      "Email support",
    ],
  },
  {
    name: "Growth",
    price: "₹2,00,000",
    period: "/year",
    activeSchools: 42,
    color: "bg-purple-50 text-purple-700 border-purple-200",
    features: [
      "Up to 2,000 students",
      "Unlimited AI Tutor queries",
      "Advanced school analytics",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    activeSchools: 5,
    color: "bg-amber-50 text-amber-700 border-amber-200",
    features: [
      "Unlimited students",
      "Multi-school management",
      "Custom AI model fine-tuning",
      "Dedicated account manager",
    ],
  },
];

const SuperAdminPlans = () => {
  return (
    <DashboardShell navItems={navItems} title="Manage Plans">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Subscription Plans</h2>
            <p className="text-gray-500 text-sm mt-1">Manage platform pricing tiers and limits.</p>
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition">
            + Create New Plan
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className={`p-6 border-b ${plan.color}`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg uppercase tracking-wider">{plan.name}</h3>
                  <span className="bg-white/50 px-2 py-1 rounded text-xs font-bold">
                    {plan.activeSchools} Schools
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold">{plan.price}</span>
                  <span className="text-sm font-medium opacity-80">{plan.period}</span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <ul className="space-y-3 mb-6 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2">
                  <button className="flex-1 border border-gray-200 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition">
                    Edit Limits
                  </button>
                  <button className="flex-1 bg-gray-900 text-white py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition">
                    Change Price
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
};

export default SuperAdminPlans;
