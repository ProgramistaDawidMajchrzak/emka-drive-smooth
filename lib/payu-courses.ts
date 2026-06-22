export interface PayuCourse {
  name: string;
  amount: number;
  perHour?: boolean;
}

export const MAX_HOURS = 20;

export const PAYU_COURSES: Record<string, PayuCourse> = {
  elearning: { name: "Kurs e-learningowy", amount: 4000 },
  stacjonarny: { name: "Kurs stacjonarny", amount: 4500 },
  ekspresowy: { name: "Kurs ekspresowy", amount: 4900 },
  automat: { name: "Kurs - skrzynia automatyczna", amount: 4800 },
  doszkalajace: { name: "Jazdy doszkalające", amount: 180, perHour: true },
};
