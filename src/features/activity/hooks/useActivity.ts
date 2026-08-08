import { useEffect, useState } from "react";
import type { ActivityItem } from "../types";
import { activityService } from "../services/activity.service";

export function useActivity() {
  const [activity, setActivity] = useState<ActivityItem[]>([]);

  useEffect(() => {
    let mounted = true;
    activityService.getAll().then((data) => {
      if (mounted) setActivity(data);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return {
    activity,
  };
}
