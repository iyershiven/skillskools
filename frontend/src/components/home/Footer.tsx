import { Brain, Twitter, Linkedin, Mail, ArrowUp } from "lucide-react";

const Footer = () => {
  return (
    <footer className="pt-20 pb-10 border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand column */}
          <div className="space-y-5">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-[#2563eb] to-[#16a34a] p-2 rounded-xl shadow-sm">
                <Brain className="text-white w-5 h-5" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-gray-900">
                ClassMind<span className="text-[#2563eb]"> AI</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              The AI-powered learning and homework platform for Indian schools. Built for CBSE, ICSE, and State Board schools.
            </p>
            <div className="flex space-x-3">
              {[Twitter, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all text-gray-500 group"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h4 className="text-gray-900 font-bold mb-5 text-sm uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-3">
              {[
                "Features",
                "How It Works",
                "AI Tutor",
                "Teacher Tools",
                "School Analytics",
                "Parent View",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#features"
                    className="text-gray-500 text-sm hover:text-blue-600 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* School links */}
          <div>
            <h4 className="text-gray-900 font-bold mb-5 text-sm uppercase tracking-wider">
              For Schools
            </h4>
            <ul className="space-y-3">
              {[
                "Pricing",
                "Book a Demo",
                "30-Day Free Trial",
                "Onboarding Guide",
                "Support",
                "FAQs",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#pricing"
                    className="text-gray-500 text-sm hover:text-blue-600 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Demo CTA */}
          <div>
            <h4 className="text-gray-900 font-bold mb-5 text-sm uppercase tracking-wider">
              Book a Demo
            </h4>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
              See ClassMind AI in action with a live walkthrough for your school leadership team.
            </p>
            <a
              href="#demo"
              id="footer-book-demo"
              className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-blue-700 transition-all"
            >
              Schedule a Demo
            </a>
            <p className="text-xs text-gray-400 mt-3">
              📍 Serving schools across India
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© 2025 ClassMind AI. All rights reserved.</p>
          <div className="flex space-x-6">
            {["Privacy Policy", "Terms of Service", "Data Protection"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-gray-700 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="p-2.5 rounded-full bg-gray-50 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:text-blue-600 text-gray-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
