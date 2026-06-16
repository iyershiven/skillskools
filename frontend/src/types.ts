// ─── Core User Types ──────────────────────────────────────────────────────────
export type UserRole =
  | "super_admin"
  | "school_admin"
  | "teacher"
  | "student"
  | "parent";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  schoolId?: string | null;
  isActive: boolean;
  studentClass?: ClassType | string | null;
  grade?: string | null;
  teacherSubjects?: Subject[];
  children?: User[];
}

// ─── School ───────────────────────────────────────────────────────────────────
export type SubscriptionPlan = "starter" | "growth" | "enterprise";
export type SubscriptionStatus = "active" | "inactive" | "trial" | "expired";

export interface School {
  _id: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  board: string;
  contactEmail: string;
  contactPhone?: string;
  isActive: boolean;
  subscriptionPlan: SubscriptionPlan;
  subscriptionStatus: SubscriptionStatus;
  subscriptionEndDate?: string;
  maxStudents: number;
}

// ─── Class & Subject ──────────────────────────────────────────────────────────
export interface ClassType {
  _id: string;
  schoolId: string;
  name: string;
  grade: string;
  section: string;
  classTeacher?: User;
  subjects: Subject[];
  students: User[];
  capacity: number;
  isActive: boolean;
}

export interface Subject {
  _id: string;
  schoolId: string;
  name: string;
  code: string;
  grade?: string;
  teachers: User[];
  isActive: boolean;
}

// ─── Homework ─────────────────────────────────────────────────────────────────
export type QuestionType = "mcq" | "short_answer" | "long_answer" | "fill_blank";
export type HomeworkStatus = "draft" | "assigned" | "closed";
export type DifficultyLevel = "easy" | "medium" | "hard";

export interface HomeworkQuestion {
  _id: string;
  homeworkId: string;
  questionText: string;
  questionType: QuestionType;
  options?: string[];
  answerKey: string;
  marks: number;
  difficulty: DifficultyLevel;
  order: number;
}

export interface Homework {
  _id: string;
  schoolId: string;
  classId: ClassType | string;
  subjectId: Subject | string;
  teacherId: User | string;
  title: string;
  description?: string;
  chapter?: string;
  dueDate: string;
  difficulty: DifficultyLevel;
  totalMarks: number;
  status: HomeworkStatus;
  questions?: HomeworkQuestion[];
  createdAt: string;
}

// ─── Submission ───────────────────────────────────────────────────────────────
export type SubmissionStatus =
  | "not_started"
  | "in_progress"
  | "submitted"
  | "reviewed";

export interface StudentAnswer {
  _id: string;
  questionId: string;
  studentAnswer: string;
  aiSuggestedScore?: number;
  aiFeedback?: string;
  teacherScore?: number;
  teacherFeedback?: string;
  finalScore: number;
}

export interface HomeworkSubmission {
  _id: string;
  homeworkId: Homework | string;
  studentId: User | string;
  status: SubmissionStatus;
  submittedAt?: string;
  totalScore: number;
  aiChecked: boolean;
  teacherReviewed: boolean;
  teacherRemarks?: string;
  answers?: StudentAnswer[];
}

// ─── Pagination ───────────────────────────────────────────────────────────────
export interface Pagination {
  total: number;
  page: number;
  pages: number;
  limit: number;
}

// ─── Legacy types (kept for backward compat) ──────────────────────────────────
export type { User as user };
export interface academicYear {
  _id: string;
  name: string;
  fromYear: Date;
  toYear: Date;
  isCurrent: boolean;
}
