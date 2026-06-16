import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, AlertCircle, Clock, Award } from "lucide-react";

const completionData = [
  { week: "Week 1", completion: 62, aiUsage: 38 },
  { week: "Week 2", completion: 70, aiUsage: 52 },
  { week: "Week 3", completion: 75, aiUsage: 63 },
  { week: "Week 4", completion: 81, aiUsage: 70 },
  { week: "Week 5", completion: 88, aiUsage: 78 },
  { week: "Week 6", completion: 94, aiUsage: 85 },
];

const statCards = [
  {
    icon: TrendingUp,
    color: "text-blue-600",
    bg: "bg-blue-50",
    title: "87%",
    label: "Avg. Homework Completion",
    sub: "+25% vs. before ClassMind",
  },
  {
    icon: Clock,
    color: "text-green-600",
    bg: "bg-green-50",
    title: "3×",
    label: "Faster Homework Creation",
    sub: "Teachers report on AI worksheets",
  },
  {
    icon: AlertCircle,
    color: "text-amber-600",
    bg: "bg-amber-50",
    title: "40%",
    label: "Drop in Weak-topic Gaps",
    sub: "After 6 weeks of AI tutoring",
  },
  {
    icon: Award,
    color: "text-purple-600",
    bg: "bg-purple-50",
    title: "9/10",
    label: "Parent Satisfaction Score",
    sub: "Progress visibility rating",
  },
];

const Stats = () => {
  return (
    <section id="stats" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block bg-green-50 text-green-700 border border-green-200 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            Real Results
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Schools see results within weeks
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            ClassMind AI improves homework completion, reduces teacher workload, and identifies learning gaps early.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900">Homework Completion Rate</h3>
              <p className="text-sm text-gray-500 mt-1">6-week trend after ClassMind AI adoption</p>
            </div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={completionData}>
                  <defs>
                    <linearGradient id="completionGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="aiGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="week" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} unit="%" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    itemStyle={{ color: "#374151" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="completion"
                    name="Homework Completion %"
                    stroke="#2563eb"
                    fillOpacity={1}
                    fill="url(#completionGrad)"
                    strokeWidth={2.5}
                  />
                  <Area
                    type="monotone"
                    dataKey="aiUsage"
                    name="AI Tutor Usage %"
                    stroke="#16a34a"
                    fillOpacity={1}
                    fill="url(#aiGrad)"
                    strokeWidth={2.5}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600" />
                <span className="text-xs text-gray-500">Homework Completion %</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-600" />
                <span className="text-xs text-gray-500">AI Tutor Usage %</span>
              </div>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 gap-4">
            {statCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:border-blue-200 hover:shadow-md transition-all flex items-start gap-4"
              >
                <div className={`p-2.5 rounded-xl ${card.bg} flex-shrink-0`}>
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-gray-900">{card.title}</p>
                  <p className="text-sm font-semibold text-gray-700 leading-snug">{card.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
