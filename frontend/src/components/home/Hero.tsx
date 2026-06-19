import { ArrowRight, GraduationCap, Globe, BookOpen, Pencil, Briefcase } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center bg-background"
    >
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 -left-20 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column — copy */}
          <div className="space-y-8 lg:pr-8 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
              Education
            </h1>

            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <a
                href="#features"
                className="flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-full font-bold text-base hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 transform hover:-translate-y-0.5"
              >
                Read More
              </a>
              <a
                href="#demo"
                className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold text-base hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 transform hover:-translate-y-0.5"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right column — Illustration */}
          <div className="relative h-[500px] w-full flex items-center justify-center lg:justify-end">
            {/* The main illustration container */}
            <div className="relative w-[400px] h-[400px]">
              {/* Abstract blob background for the illustration */}
              <div className="absolute inset-0 bg-primary/10 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] animate-[spin_20s_linear_infinite] blur-xl" />
              <div className="absolute inset-0 bg-secondary/10 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] animate-[spin_25s_linear_infinite_reverse] blur-xl" />

              {/* Composition of icons to represent the illustration */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                {/* Center Student/Laptop representation */}
                <div className="relative bg-white w-48 h-48 rounded-3xl shadow-2xl flex items-center justify-center border border-gray-100 z-20">
                  <div className="absolute -top-12 -right-8 bg-secondary/20 p-4 rounded-2xl rotate-12">
                    <GraduationCap className="w-12 h-12 text-secondary" />
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/10 p-4 rounded-full inline-block mb-2">
                      <BookOpen className="w-12 h-12 text-primary" />
                    </div>
                    <div className="w-24 h-2 bg-gray-200 rounded-full mx-auto" />
                    <div className="w-16 h-2 bg-gray-200 rounded-full mx-auto mt-2" />
                  </div>
                </div>

                {/* Left side elements */}
                <div className="absolute -left-12 bottom-10 bg-white p-4 rounded-full shadow-xl border border-gray-50 animate-[bounce_4s_ease-in-out_infinite]">
                  <Globe className="w-16 h-16 text-secondary" />
                </div>

                {/* Right side elements */}
                <div className="absolute -right-8 bottom-20 bg-primary p-5 rounded-2xl shadow-xl shadow-primary/30 rotate-6 animate-[pulse_4s_ease-in-out_infinite]">
                  <Briefcase className="w-10 h-10 text-white" />
                </div>

                <div className="absolute right-4 top-10 bg-white p-3 rounded-full shadow-lg border border-gray-100 -rotate-12">
                  <Pencil className="w-8 h-8 text-accent" />
                </div>

                {/* Stack of books representation */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-80 h-32 flex flex-col items-center justify-end z-10">
                  <div className="w-64 h-8 bg-primary rounded-xl mb-1 shadow-lg transform rotate-1" />
                  <div className="w-72 h-10 bg-secondary rounded-xl mb-1 shadow-lg transform -rotate-2" />
                  <div className="w-80 h-12 bg-white border-2 border-primary rounded-xl shadow-xl flex items-center px-4">
                    <div className="w-full h-2 bg-gray-100 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
