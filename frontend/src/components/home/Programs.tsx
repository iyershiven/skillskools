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
    color: "bg-blue-100 text-blue-600",
    title: "AI Tutor for Students",
    description:
      "Safe, school-approved AI that guides students with hints — not direct answers. Explains concepts step by step using age-appropriate language.",
    points: ["Progressive hints system", "Grade-level explanations", "Safety guardrails built-in"],
  },
  {
    icon: FileText,
    color: "bg-green-100 text-green-600",
    title: "AI Homework Creator (Teachers)",
    description:
      "Generate complete worksheets with questions, answer keys, and difficulty labels in seconds. Edit before assigning.",
    points: ["MCQ, Short, Long, Fill-in-the-blank", "Chapter & difficulty control", "Auto answer key generation"],
  },
  {
    icon: CheckCircle2,
    color: "bg-purple-100 text-purple-600",
    title: "AI Answer Checker",
    description:
      "AI suggests marks and feedback on student submissions. Teachers always have full override control — AI just saves time.",
    points: ["Suggested score with confidence", "Detailed correction feedback", "Teacher override always available"],
  },
  {
    icon: BarChart3,
    color: "bg-amber-100 text-amber-600",
    title: "School Analytics Dashboard",
    description:
      "Principals and school admins get real-time learning analytics — homework completion rates, weak topics, subject performance.",
    points: ["Class-wise performance charts", "Weak topic identification", "AI usage & engagement reports"],
  },
  {
    icon: Users,
    color: "bg-rose-100 text-rose-600",
    title: "Parent Progress View",
    description:
      "Parents see exactly where their child stands — pending homework, completed work, teacher remarks, and improvement trends.",
    points: ["Weekly progress summaries", "Homework status at a glance", "Direct teacher remarks"],
  },
  {
    icon: ShieldCheck,
    color: "bg-teal-100 text-teal-600",
    title: "Safe & School-Controlled",
    description:
      "All AI interactions are logged and auditable. No social features, no public profiles. A closed, school-approved environment.",
    points: ["No student-to-student chat", "Full admin visibility", "GDPR-friendly data isolation"],
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            Platform Features
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Everything a school needs{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
              in one platform
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            ClassMind AI connects students, teachers, parents, and school admins in a single, AI-powered learning ecosystem.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-white border border-gray-100 rounded-2xl p-6 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 cursor-default"
            >
              <div className={`inline-flex p-3 rounded-xl ${feature.color} mb-4`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.points.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-10 text-center text-white">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold mb-3">
            Built for Indian schools. Ready for Grades 6–8.
          </h3>
          <p className="text-blue-100 max-w-2xl mx-auto mb-6">
            ClassMind AI is purpose-built for CBSE, ICSE, and State Board schools. MVP covers Mathematics, Science, and English — with more subjects coming.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Mathematics", "Science", "English", "More coming soon"].map((s) => (
              <span key={s} className="bg-white/20 border border-white/30 text-white text-sm font-medium px-4 py-1.5 rounded-full">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
