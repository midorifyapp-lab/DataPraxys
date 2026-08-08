export type FileStatus = "pending" | "available" | "downloaded" | "deleted";
export type Direction = "received" | "sent";

export interface FileRecord {
  id: string;
  companyId: string;
  direction: Direction;
  filename: string;
  size: string;
  status: FileStatus;
  sentDate: string;
  downloadedDate?: string;
}
