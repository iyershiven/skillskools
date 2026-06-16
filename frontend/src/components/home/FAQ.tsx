import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is ClassMind AI safe for students?",
    a: "Absolutely. ClassMind AI is a closed, school-approved environment. There are no social features, no public student profiles, and no student-to-student chat. Every AI interaction is logged and can be reviewed by teachers and admins. The AI is specifically prompted to avoid giving direct homework answers and to redirect off-topic questions.",
  },
  {
    q: "Which boards and grades does it support?",
    a: "The MVP supports CBSE, ICSE, and State Board schools for Grades 6, 7, and 8. The subjects covered are Mathematics, Science, and English. More grades and subjects are being added based on school feedback.",
  },
  {
    q: "Does the AI do the homework for students?",
    a: "No — and this is by design. ClassMind AI uses a progressive hint system. It guides students step-by-step toward the answer, asking them leading questions and explaining concepts. It avoids giving direct final answers for homework questions.",
  },
  {
    q: "Can teachers control what the AI does?",
    a: "Yes. Teachers create and assign homework. The AI only assists within the context of assigned work. For AI-checked answers, teachers always have full override control over scores and feedback. Nothing is auto-submitted without teacher review.",
  },
  {
    q: "How long does school onboarding take?",
    a: "Most schools are live within 2–3 days. Our team handles the data setup — classes, teachers, and students can be bulk-imported. We also provide a training session for teachers and admins.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes! All plans include a 30-day free pilot period so your school can test the full platform with a real class before committing. No credit card required during the pilot.",
  },
  {
    q: "How is student data protected?",
    a: "All student data is isolated per school (multi-tenant architecture with schoolId scoping). We do not share or use student data to train external AI models. Data is encrypted at rest and in transit.",
  },
];

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-4">
          <span className="inline-block bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            FAQ
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900">
            Questions from schools
          </h2>
          <p className="text-gray-600 text-lg">
            Everything school admins and principals ask before signing up.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                openIdx === idx ? "border-blue-200 shadow-md" : "border-gray-100 shadow-sm"
              }`}
            >
              <button
                id={`faq-toggle-${idx}`}
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-semibold text-gray-900 text-sm">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 ml-4 transition-transform duration-200 ${
                    openIdx === idx ? "rotate-180 text-blue-600" : ""
                  }`}
                />
              </button>
              {openIdx === idx && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
