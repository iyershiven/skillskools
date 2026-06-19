import {
  Brain,
  BookOpen,
  BarChart3,
  Users,
  MessageCircle,
  FileText,
  ShieldCheck,
  TrendingUp,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Tutor for Students",
    description:
      "Safe, school-approved AI that guides students with hints — not direct answers. Explains concepts step by step using age-appropriate language.",
    points: ["Progressive hints system", "Grade-level explanations", "Safety guardrails built-in"],
  },
  {
    icon: FileText,
    title: "AI Homework Creator",
    description:
      "Generate complete worksheets with questions, answer keys, and difficulty labels in seconds. Edit before assigning.",
    points: ["MCQ, Short, Long, Fill-in-the-blank", "Chapter & difficulty control", "Auto answer key generation"],
  },
  {
    icon: CheckCircle2,
    title: "AI Answer Checker",
    description:
      "AI suggests marks and feedback on student submissions. Teachers always have full override control — AI just saves time.",
    points: ["Suggested score with confidence", "Detailed correction feedback", "Teacher override always available"],
  },
  {
    icon: BarChart3,
    title: "School Analytics Dashboard",
    description:
      "Principals and school admins get real-time learning analytics — homework completion rates, weak topics, subject performance.",
    points: ["Class-wise performance charts", "Weak topic identification", "AI usage & engagement reports"],
  },
  {
    icon: Users,
    title: "Parent Progress View",
    description:
      "Parents see exactly where their child stands — pending homework, completed work, teacher remarks, and improvement trends.",
    points: ["Weekly progress summaries", "Homework status at a glance", "Direct teacher remarks"],
  },
  {
    icon: ShieldCheck,
    title: "Safe & School-Controlled",
    description:
      "All AI interactions are logged and auditable. No social features, no public profiles. A closed, school-approved environment.",
    points: ["No student-to-student chat", "Full admin visibility", "GDPR-friendly data isolation"],
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block bg-primary/10 text-primary border border-primary/20 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            Platform Features
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Everything a school needs{" "}
            <span className="text-primary">
              in one platform
            </span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            ClassMind AI connects students, teachers, parents, and school admins in a single, AI-powered learning ecosystem.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{feature.description}</p>
              <ul className="space-y-3">
                {feature.points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div className="mt-20 bg-primary rounded-[2.5rem] p-10 md:p-14 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
              Built for Indian schools. Ready for Grades 6–8.
            </h3>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-lg">
              ClassMind AI is purpose-built for CBSE, ICSE, and State Board schools. MVP covers Mathematics, Science, and English — with more subjects coming.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Mathematics", "Science", "English", "More coming soon"].map((s) => (
                <span key={s} className="bg-white/20 border border-white/30 text-white text-sm font-semibold px-5 py-2 rounded-full backdrop-blur-sm">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
