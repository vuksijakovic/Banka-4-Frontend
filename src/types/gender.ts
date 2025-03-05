export type Gender = 'male' | 'female';

export const genderValues = ['male', 'female'] as const;

export function normalizeGender(gender: string): Gender {
  return gender.toLowerCase() === 'male' ? 'male' : 'female';
}
