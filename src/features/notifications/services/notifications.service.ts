import { notifications as notificationSeed } from "../../notifications/mocks/notifications.mock";
import type { AppNotification } from "../types";
import { useApi, apiClient } from "@/lib/api/adapter";

export const notificationsService = {
  getAll: async (): Promise<AppNotification[]> =>
    useApi ? await apiClient.get<AppNotification[]>("/notifications") : notificationSeed,
  markAllRead: async (): Promise<AppNotification[]> =>
    useApi
      ? await apiClient.post<AppNotification[]>("/notifications/mark-all-read")
      : notificationSeed.map((n) => ({ ...n, read: true })),
};
