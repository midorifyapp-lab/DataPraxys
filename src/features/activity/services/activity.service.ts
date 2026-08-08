import { activity as activitySeed } from "../mocks/activity.mock";
import type { ActivityItem } from "../types";
import { useApi, apiClient } from "@/lib/api/adapter";

export const activityService = {
  getAll: async (): Promise<ActivityItem[]> =>
    useApi ? await apiClient.get<ActivityItem[]>("/activity") : activitySeed,
};
