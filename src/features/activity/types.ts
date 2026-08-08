export interface ActivityItem {
  id: string;
  type: "upload" | "send" | "company_created" | "download";
  actor: string;
  description: string;
  time: string;
}
