import { Check, Sparkles, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "₹75,000",
    period: "/year",
    tagline: "Perfect for growing schools up to 500 students",
    highlight: false,
    badge: null,
    features: [
      "Up to 500 students",
      "AI Tutor (1,000 queries/month)",
      "Homework creation & submission",
      "Teacher worksheet generator",
      "Parent progress view",
      "Basic school analytics",
      "Email support",
      "CBSE / ICSE / State Board",
    ],
    cta: "Get Started",
    ctaLink: "#demo",
  },
  {
    name: "Growth",
    price: "₹2,00,000",
    period: "/year",
    tagline: "For schools ready to scale AI across all classes",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Up to 2,000 students",
      "Unlimited AI Tutor queries",
      "Advanced homework analytics",
      "AI answer checking",
      "Learning gap identification",
      "Advanced school analytics",
      "Priority support + onboarding",
      "Custom school branding",
      "Parent app access",
      "All Starter features",
    ],
    cta: "Book a Demo",
    ctaLink: "#demo",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    tagline: "Multi-school chains, trusts, and large institutions",
    highlight: false,
    badge: null,
    features: [
      "Unlimited students",
      "Unlimited AI queries",
      "Multi-school management",
      "White-label option",
      "Custom AI model fine-tuning",
      "Dedicated account manager",
      "SLA-backed uptime",
      "API access",
      "Advanced reporting & BI",
      "All Growth features",
    ],
    cta: "Contact Sales",
    ctaLink: "#demo",
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            Simple Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Annual school subscriptions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            One flat annual fee for your entire school. No per-student billing surprises.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 ${
                plan.highlight
                  ? "bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-2xl shadow-blue-500/30 scale-105 border-0"
                  : "bg-white border border-gray-200 hover:border-blue-200 hover:shadow-lg shadow-sm"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="flex items-center gap-1.5 bg-amber-400 text-amber-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
                    <Sparkles className="w-3.5 h-3.5" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${plan.highlight ? "text-blue-200" : "text-blue-600"}`}>
                  {plan.name}
                </p>
                <div className="flex items-end gap-1 mb-2">
                  <span className={`text-4xl font-extrabold ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-sm font-medium mb-1 ${plan.highlight ? "text-blue-200" : "text-gray-500"}`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={`text-sm ${plan.highlight ? "text-blue-100" : "text-gray-500"}`}>
                  {plan.tagline}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.highlight ? "bg-white/20" : "bg-green-50"}`}>
                      <Check className={`w-3 h-3 ${plan.highlight ? "text-white" : "text-green-600"}`} />
                    </div>
                    <span className={`text-sm ${plan.highlight ? "text-blue-50" : "text-gray-600"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.ctaLink}
                id={`pricing-cta-${plan.name.toLowerCase()}`}
                className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm transition-all ${
                  plan.highlight
                    ? "bg-white text-blue-700 hover:bg-blue-50"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Trust note */}
        <p className="text-center text-sm text-gray-400 mt-10">
          All plans include a 30-day free pilot period · No setup fees · Cancel before renewal
        </p>
      </div>
    </section>
  );
};

export default Pricing;
