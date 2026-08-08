import { files as filesSeed } from "../../exchange/mocks/exchange.mock";
import type { FileRecord } from "../types";
import { useApi, apiClient } from "@/lib/api/adapter";

export const exchangeService = {
  getAll: async (): Promise<FileRecord[]> =>
    useApi ? await apiClient.get<FileRecord[]>("/files") : filesSeed,
  getByCompany: async (companyId: string): Promise<FileRecord[]> =>
    useApi
      ? await apiClient.get<FileRecord[]>(`/files?companyId=${companyId}`)
      : filesSeed.filter((file) => file.companyId === companyId),
};
