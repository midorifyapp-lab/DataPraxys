import { useEffect, useState } from "react";
import type { FileRecord } from "../types";
import { exchangeService } from "../services/exchange.service";

export function useExchange() {
  const [files, setFiles] = useState<FileRecord[]>([]);

  useEffect(() => {
    let mounted = true;
    exchangeService.getAll().then((data) => {
      if (mounted) setFiles(data);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const getFilesByCompany = (companyId: string) =>
    files.filter((file) => file.companyId === companyId);

  return {
    files,
    getFilesByCompany,
  };
}
