export type CompanyStatus = "active" | "inactive";

export interface Company {
  id: string;
  name: string;
  ruc: string;
  username: string;
  email: string;
  position: string;
  logo: string;
  status: CompanyStatus;
  createdAt: string;
}

export type CreateCompanyInput = Partial<Company> & {
  name: string;
  ruc: string;
  username: string;
  email: string;
};

export type UpdateCompanyInput = Partial<Company>;
