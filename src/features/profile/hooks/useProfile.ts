import { useEffect, useState } from "react";
import type { Profile, UpdateProfileInput } from "../types";
import { profileService } from "../services/profile.service";

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    let mounted = true;
    profileService.getCurrent().then((p) => {
      if (mounted) setProfile(p);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const update = async (data: UpdateProfileInput) => {
    if (!profile) return undefined;
    const updated = await profileService.update(profile.id, data);
    if (updated) setProfile(updated);
    return updated;
  };

  return { profile, update };
}
