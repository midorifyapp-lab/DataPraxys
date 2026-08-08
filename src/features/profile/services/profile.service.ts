import { profile as profileSeed } from "../mocks/profile.mock";
import type { Profile, UpdateProfileInput } from "../types";
import { useApi, apiClient } from "@/lib/api/adapter";

export const profileService = {
  getCurrent: async (): Promise<Profile> =>
    useApi ? await apiClient.get<Profile>("/profile/me") : profileSeed,
  update: async (id: string, data: UpdateProfileInput): Promise<Profile | undefined> =>
    useApi ? await apiClient.put<Profile>(`/profile/${id}`, data) : { ...profileSeed, ...data },
};
