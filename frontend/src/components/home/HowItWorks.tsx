import { ArrowRight, User, BookOpen, Users, BarChart3 } from "lucide-react";

const steps = [
  {
    role: "Teacher",
    icon: BookOpen,
    color: "bg-primary",
    lightColor: "bg-primary/10 border-primary/20 text-primary",
    step: "01",
    title: "Teacher creates homework",
    description:
      "Teacher uses AI to generate a worksheet or creates one manually. Sets questions, difficulty, due date, and assigns to a class.",
  },
  {
    role: "Student",
    icon: User,
    color: "bg-secondary",
    lightColor: "bg-secondary/10 border-secondary/20 text-secondary",
    step: "02",
    title: "Student receives & attempts",
    description:
      "Student sees the homework on their dashboard. When stuck, they ask ClassMind AI for hints — the AI guides, not gives answers.",
  },
  {
    role: "AI + Teacher",
    icon: BarChart3,
    color: "bg-accent",
    lightColor: "bg-accent/10 border-accent/20 text-accent",
    step: "03",
    title: "AI checks, Teacher reviews",
    description:
      "AI suggests scores and feedback on submissions. Teacher reviews, edits if needed, and publishes final results with remarks.",
  },
  {
    role: "Parent + Admin",
    icon: Users,
    color: "bg-primary",
    lightColor: "bg-primary/10 border-primary/20 text-primary",
    step: "04",
    title: "Parents see progress, Admin sees analytics",
    description:
      "Parents view their child's homework status and teacher remarks. School admin gets class-level analytics and weak topic reports.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block bg-secondary/10 text-secondary border border-secondary/20 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            One workflow. Four beneficiaries.
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            ClassMind AI connects the complete learning cycle — from homework creation to parent visibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Connector arrow */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-12 -right-6 z-10 items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-gray-300" />
                </div>
              )}

              <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${step.lightColor}`}>
                    {step.role}
                  </span>
                  <span className="text-4xl font-black text-gray-100 group-hover:text-primary/10 transition-colors">
                    {step.step}
                  </span>
                </div>

                <div className={`inline-flex p-4 rounded-2xl ${step.color} mb-6 shadow-md transform group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
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
