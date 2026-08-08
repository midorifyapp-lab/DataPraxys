import { companies as companiesMock } from "../mocks/companies.mock";
import type { Company, CreateCompanyInput, UpdateCompanyInput } from "../types";

export const companiesService = {
  getAll: async (): Promise<Company[]> => companiesMock,
  getById: async (id: string): Promise<Company | undefined> =>
    companiesMock.find((company) => company.id === id),
  create: async (data: CreateCompanyInput): Promise<Company> =>
    ({
      id: `c${Date.now()}`,
      logo: data.logo ?? "EX",
      status: data.status ?? "active",
      createdAt: new Date().toISOString().slice(0, 10),
      ...data,
    }) as Company,
  update: async (id: string, data: UpdateCompanyInput): Promise<Company | undefined> => {
    const company = companiesMock.find((item) => item.id === id);
    if (!company) return undefined;
    return { ...company, ...data };
  },
};
