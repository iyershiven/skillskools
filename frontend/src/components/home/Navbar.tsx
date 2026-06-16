import { useState, useEffect } from "react";
import { Menu, X, Brain } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md py-3 shadow-lg border-b border-gray-100"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-[#2563eb] to-[#16a34a] p-2 rounded-xl shadow-md">
              <Brain className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-gray-900">
              ClassMind<span className="text-[#2563eb]"> AI</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-[#2563eb] transition-colors font-medium text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/login"
              className="text-gray-700 hover:text-[#2563eb] font-medium text-sm transition-colors"
            >
              School Login
            </Link>
            <a
              href="#demo"
              className="bg-[#2563eb] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#1d4ed8] transition-all transform hover:scale-105 shadow-md shadow-blue-500/20"
            >
              Book Demo
            </a>
          </div>

          {/* Mobile button */}
          <div className="md:hidden flex items-center space-x-3">
            <a
              href="#demo"
              className="bg-[#2563eb] text-white px-4 py-2 rounded-lg font-semibold text-sm"
            >
              Book Demo
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 p-1"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-4 pb-6 space-y-4 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-[#2563eb] text-base font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-gray-100">
            <Link
              to="/login"
              className="block text-gray-700 hover:text-[#2563eb] text-base font-medium py-1"
            >
              School Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
