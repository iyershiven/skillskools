import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Features from "@/components/home/Programs"; // repurposed as Features
import Stats from "@/components/home/Stats";
import Pricing from "@/components/home/Pricing";
import DemoCTA from "@/components/home/DemoCTA";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/home/Footer";

const Home = () => {
  return (
    <div className="bg-white text-gray-900 antialiased">
      <Navbar />

      <main>
        {/* 1. Hero — above the fold */}
        <Hero />

        {/* 2. Social proof / stats bar */}
        <section className="py-10 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">
              Trusted by schools across India
            </p>
            <div className="flex flex-wrap justify-center items-center gap-10 opacity-40 hover:opacity-70 transition-opacity duration-500">
              {["Delhi Public School", "St. Xavier's", "DAV Public School", "Kendriya Vidyalaya", "Ryan International"].map((school) => (
                <span key={school} className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                  {school}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Features */}
        <Features />

        {/* 4. How it works */}
        <HowItWorks />

        {/* 5. Stats / proof */}
        <Stats />

        {/* 6. Pricing */}
        <Pricing />

        {/* 7. Demo CTA */}
        <DemoCTA />

        {/* 8. FAQ */}
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
