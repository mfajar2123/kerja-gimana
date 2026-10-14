export const SALARY_MIN_SAMPLE = 5
export function detectPersonalInformation(value: string) {
  return /[\w.+-]+@[\w.-]+\.[a-z]{2,}|(?:\+62|\b08)[\d\s-]{8,}|\b\d{16}\b/i.test(value)
}
export function monthlySalary(amount: number, period: 'monthly' | 'yearly') {
  return period === 'yearly' ? amount / 12 : amount
}
