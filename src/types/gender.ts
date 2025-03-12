export const ALL_GENDERS_ = ['MALE', 'FEMALE'] as const;

export type Gender = (typeof ALL_GENDERS_)[number];
