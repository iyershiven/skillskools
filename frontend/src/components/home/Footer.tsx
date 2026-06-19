import { Brain, Twitter, Linkedin, Mail, ArrowUp } from "lucide-react";

const Footer = () => {
  return (
    <footer className="pt-20 pb-10 border-t border-gray-100 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="bg-primary/10 p-2.5 rounded-xl text-primary shadow-sm border border-primary/20">
                <Brain className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-gray-900">
                ClassMind<span className="text-primary"> AI</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed pr-4">
              The AI-powered learning and homework platform for Indian schools. Built for CBSE, ICSE, and State Board schools.
            </p>
            <div className="flex space-x-3">
              {[Twitter, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all text-gray-500 shadow-sm group"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6 text-sm uppercase tracking-widest">
              Platform
            </h4>
            <ul className="space-y-4">
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
                    className="text-gray-500 text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* School links */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6 text-sm uppercase tracking-widest">
              For Schools
            </h4>
            <ul className="space-y-4">
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
                    className="text-gray-500 text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Demo CTA */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6 text-sm uppercase tracking-widest">
              Book a Demo
            </h4>
            <p className="text-gray-500 text-sm mb-5 leading-relaxed">
              See ClassMind AI in action with a live walkthrough for your school leadership team.
            </p>
            <a
              href="#demo"
              id="footer-book-demo"
              className="inline-flex items-center gap-2 bg-primary text-white text-sm font-bold px-6 py-3.5 rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/20 hover:-translate-y-0.5"
            >
              Schedule a Demo
            </a>
            <p className="text-xs text-gray-400 mt-4 font-medium flex items-center gap-1.5">
              <span>📍</span> Serving schools across India
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-6">
          <p className="font-medium">© 2025 ClassMind AI. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6 font-medium">
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
            className="p-3 rounded-full bg-white border border-gray-100 hover:border-primary/20 hover:bg-primary/5 hover:text-primary transition-all shadow-sm group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
