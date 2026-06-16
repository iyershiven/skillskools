import { ArrowRight, User, BookOpen, Users, BarChart3 } from "lucide-react";

const steps = [
  {
    role: "Teacher",
    icon: BookOpen,
    color: "bg-blue-600",
    lightColor: "bg-blue-50 border-blue-200 text-blue-700",
    step: "01",
    title: "Teacher creates homework",
    description:
      "Teacher uses AI to generate a worksheet or creates one manually. Sets questions, difficulty, due date, and assigns to a class.",
  },
  {
    role: "Student",
    icon: User,
    color: "bg-green-600",
    lightColor: "bg-green-50 border-green-200 text-green-700",
    step: "02",
    title: "Student receives & attempts",
    description:
      "Student sees the homework on their dashboard. When stuck, they ask ClassMind AI for hints — the AI guides, not gives answers.",
  },
  {
    role: "AI + Teacher",
    icon: BarChart3,
    color: "bg-purple-600",
    lightColor: "bg-purple-50 border-purple-200 text-purple-700",
    step: "03",
    title: "AI checks, Teacher reviews",
    description:
      "AI suggests scores and feedback on submissions. Teacher reviews, edits if needed, and publishes final results with remarks.",
  },
  {
    role: "Parent + Admin",
    icon: Users,
    color: "bg-amber-600",
    lightColor: "bg-amber-50 border-amber-200 text-amber-700",
    step: "04",
    title: "Parents see progress, Admin sees analytics",
    description:
      "Parents view their child's homework status and teacher remarks. School admin gets class-level analytics and weak topic reports.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block bg-green-50 text-green-700 border border-green-200 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            One workflow. Four beneficiaries.
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            ClassMind AI connects the complete learning cycle — from homework creation to parent visibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Connector arrow */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-10 -right-3 z-10 items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-gray-300" />
                </div>
              )}

              <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-blue-200 hover:shadow-lg transition-all duration-300 h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${step.lightColor}`}>
                    {step.role}
                  </span>
                  <span className="text-3xl font-black text-gray-100">{step.step}</span>
                </div>

                <div className={`inline-flex p-3 rounded-xl ${step.color} mb-4`}>
                  <step.icon className="w-5 h-5 text-white" />
                </div>

                <h3 className="text-base font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
