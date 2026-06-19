import { ArrowRight, Calendar, Phone } from "lucide-react";

const DemoCTA = () => {
  return (
    <section id="demo" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-primary rounded-[3rem] p-12 md:p-20 text-center overflow-hidden shadow-2xl shadow-primary/20">
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-secondary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-accent/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-block bg-white/20 text-white text-xs font-bold px-5 py-2 rounded-full uppercase tracking-widest mb-8 backdrop-blur-sm shadow-sm">
              Free 30-Day Pilot
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Ready to bring AI learning <br className="hidden md:block" />
              to your school?
            </h2>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
              Book a 30-minute live demo for your principal and department heads. We'll walk through the full student, teacher, and admin experience — live.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <a
                href="mailto:demo@classmindai.com"
                id="demo-book-cta"
                className="flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-all transform hover:-translate-y-0.5 shadow-xl hover:shadow-2xl"
              >
                <Calendar className="w-5 h-5" />
                Book a School Demo
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="tel:+919999999999"
                className="flex items-center gap-3 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                <Phone className="w-5 h-5" />
                Call Sales
              </a>
            </div>

            <p className="text-white/60 text-sm mt-10 font-medium tracking-wide">
              No commitment · No credit card · Full access for 30 days
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoCTA;
