import { notifications as notificationSeed } from "../../notifications/mocks/notifications.mock";
import type { AppNotification } from "../types";

export const notificationsService = {
  getAll: async (): Promise<AppNotification[]> => notificationSeed,
  markAllRead: async (): Promise<AppNotification[]> =>
    notificationSeed.map((notification) => ({ ...notification, read: true })),
};
