export interface Company {
  id: string; name: string; slug: string; industry: string; location: string;
  description: string; website: string | null; verified: boolean;
  review_count: number; ratings: Record<string, number | null>; salary: SalaryInsight[];
}
export interface SalaryInsight {
  role: string; location: string; employment_type: string; experience_level: string;
  salary_basis: 'gross' | 'take_home'; sample_band: '5–9' | '10–19' | '20+'; median_monthly: number;
}
export interface CompanyStatistics { companies: number; reviews: number; salary_reports: number; configured?: boolean }
export interface CompanyResponse { id: string; content: string; published_month: string }
export interface PublicReview {
  id: string; job_title: string; employment_status: string; employment_start: number;
  employment_end: number | null; positives: string; improvements: string; advice: string;
  ratings: Record<string, number>; published_month: string; company_responses: CompanyResponse[];
}
export interface PublicInterview {
  id: string; position: string; stages: string; difficulty: number; experience: string;
  duration_days: number; questions: string; outcome: string;
}
export interface DirectoryResult { companies: Company[]; total: number; configured: boolean }
