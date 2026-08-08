import { useEffect, useState } from "react";
import type { Company, CreateCompanyInput, UpdateCompanyInput } from "../types";
import { companiesService } from "../services/companies.service";

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    let mounted = true;
    companiesService.getAll().then((data) => {
      if (mounted) setCompanies(data);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const removeCompany = (id: string) => {
    setCompanies((current) => current.filter((company) => company.id !== id));
  };

  const createCompany = async (data: CreateCompanyInput) => {
    const company = await companiesService.create(data);
    setCompanies((current) => [...current, company]);
    return company;
  };

  const updateCompany = async (id: string, data: UpdateCompanyInput) => {
    const updated = await companiesService.update(id, data);
    if (!updated) return undefined;
    setCompanies((current) => current.map((company) => (company.id === id ? updated : company)));
    return updated;
  };

  return {
    companies,
    removeCompany,
    createCompany,
    updateCompany,
  };
}
