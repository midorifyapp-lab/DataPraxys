import { useEffect, useState } from "react";
import type { AppNotification } from "../types";
import { notificationsService } from "../services/notifications.service";

export function useNotifications() {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    let mounted = true;
    notificationsService.getAll().then((data) => {
      if (mounted) setNotifications(data);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const markAllRead = async () => {
    const updated = await notificationsService.markAllRead();
    setNotifications(updated);
  };

  return {
    notifications,
    markAllRead,
  };
}
