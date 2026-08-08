export interface Settings {
  id: string;
  companyName?: string;
  billingEmail?: string;
  timezone?: string;
  language?: string;
}

export type UpdateSettingsInput = Partial<Settings>;
