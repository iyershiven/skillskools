import { ArrowRight, Calendar, Phone } from "lucide-react";

const DemoCTA = () => {
  return (
    <section id="demo" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-10 md:p-16 text-center overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <span className="inline-block bg-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
              Free 30-Day Pilot
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
              Ready to bring AI learning <br className="hidden md:block" />
              to your school?
            </h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">
              Book a 30-minute live demo for your principal and department heads. We'll walk through the full student, teacher, and admin experience — live.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:demo@classmindai.com"
                id="demo-book-cta"
                className="flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
              >
                <Calendar className="w-5 h-5" />
                Book a School Demo
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="tel:+919999999999"
                className="flex items-center gap-2 bg-white/10 border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all"
              >
                <Phone className="w-5 h-5" />
                Call Sales
              </a>
            </div>

            <p className="text-blue-200 text-sm mt-8">
              No commitment · No credit card · Full access for 30 days
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoCTA;
