import { files as filesSeed } from "../../exchange/mocks/exchange.mock";
import type { FileRecord } from "../types";

export const exchangeService = {
  getAll: async (): Promise<FileRecord[]> => filesSeed,
  getByCompany: async (companyId: string): Promise<FileRecord[]> =>
    filesSeed.filter((file) => file.companyId === companyId),
};
