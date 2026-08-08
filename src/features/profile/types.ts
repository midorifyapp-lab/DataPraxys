export interface Profile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  companyId?: string;
}

export type UpdateProfileInput = Partial<Profile>;
