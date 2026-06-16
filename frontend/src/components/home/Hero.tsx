import { ArrowRight, Play, CheckCircle, Sparkles, Users, BookOpen } from "lucide-react";

const badges = [
  { label: "CBSE Aligned" },
  { label: "ICSE Aligned" },
  { label: "State Board" },
];

const trustItems = [
  { value: "500+", label: "Schools Trust Us" },
  { value: "1L+", label: "Students Learning" },
  { value: "98%", label: "Homework Completion" },
];

const Hero = () => {
  return (
    <section
      id="home"
      className="relative pt-28 pb-20 overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-blue-50/40 to-green-50/30"
    >
      {/* Decorative blobs */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-400/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column — copy */}
          <div className="space-y-8">
            {/* Badge row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-blue-600/10 border border-blue-200 px-3 py-1 rounded-full text-blue-700 text-xs font-semibold uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
                </span>
                AI-Powered School Platform
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              The AI Learning Layer Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
                School Needs
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
              Give every student a safe AI tutor at home, help teachers create and check homework faster, and give schools real-time learning analytics.
            </p>

            {/* Board badges */}
            <div className="flex flex-wrap gap-2">
              {badges.map((b) => (
                <span
                  key={b.label}
                  className="bg-white border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1 rounded-full shadow-sm"
                >
                  {b.label}
                </span>
              ))}
            </div>

            {/* Key selling points */}
            <ul className="space-y-3">
              {[
                "AI hints guide students — doesn't do homework for them",
                "Teachers create & check homework 3× faster",
                "Principals get live learning analytics",
                "Parents see real progress, not just marks",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-medium">{point}</span>
                </li>
              ))}
            </ul>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#demo"
                id="hero-book-demo"
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-blue-700 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-blue-500/30"
              >
                Book a School Demo
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#features"
                id="hero-view-product"
                className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-800 px-8 py-4 rounded-xl font-bold text-base hover:border-blue-300 hover:bg-blue-50 transition-all"
              >
                <Play className="w-4 h-4 text-blue-600 fill-blue-600" />
                View Product
              </a>
            </div>

            {/* Trust bar */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-200">
              {trustItems.map((item, i) => (
                <div key={i}>
                  <p className="text-2xl font-extrabold text-gray-900">{item.value}</p>
                  <p className="text-xs text-gray-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — product preview card */}
          <div className="relative">
            {/* Main card */}
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-2xl bg-white">
              {/* Card header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 p-1.5 rounded-lg">
                      <BookOpen className="text-white w-4 h-4" />
                    </div>
                    <span className="text-white font-semibold text-sm">Student Dashboard</span>
                  </div>
                  <span className="bg-green-400 text-green-900 text-xs font-bold px-2 py-0.5 rounded-full">Live</span>
                </div>
                <p className="text-blue-100 text-xs">Class 7A · Mathematics · Due today</p>
              </div>

              {/* Homework card */}
              <div className="p-5 space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Fractions Worksheet</p>
                      <p className="text-xs text-gray-500">Chapter 5 · 10 Questions</p>
                    </div>
                    <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full">Pending</span>
                  </div>
                  <div className="w-full bg-amber-200 rounded-full h-1.5">
                    <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: "40%" }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">4 of 10 answered</p>
                </div>

                {/* AI Tutor bubble */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-600 rounded-full p-1.5 flex-shrink-0">
                      <Sparkles className="text-white w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-blue-800 mb-1">ClassMind AI Tutor</p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Let's think about this step by step. To add fractions, you first need to find a common denominator. What is the LCM of 4 and 6?
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2 text-xs text-gray-500">
                    Ask a doubt...
                  </div>
                  <button className="bg-blue-600 text-white text-xs font-semibold px-3 py-2 rounded-lg">
                    Ask AI
                  </button>
                </div>
              </div>
            </div>

            {/* Floating badge — Teacher */}
            <div className="absolute -top-5 -left-5 bg-white border border-gray-200 rounded-2xl shadow-xl p-3 hidden md:flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-xl">
                <Users className="text-green-600 w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Mrs. Sharma</p>
                <p className="text-[10px] text-gray-500">Created 3 assignments today</p>
              </div>
            </div>

            {/* Floating badge — Completion */}
            <div className="absolute -bottom-5 -right-5 bg-white border border-gray-200 rounded-2xl shadow-xl p-3 hidden md:flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-xl">
                <CheckCircle className="text-blue-600 w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Class 7A</p>
                <p className="text-[10px] text-green-600 font-semibold">87% homework completed ↑</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
