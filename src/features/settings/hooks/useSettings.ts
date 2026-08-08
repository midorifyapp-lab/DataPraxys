import { useEffect, useState } from "react";
import type { Settings, UpdateSettingsInput } from "../types";
import { settingsService } from "../services/settings.service";

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    let mounted = true;
    settingsService.get().then((s) => {
      if (mounted) setSettings(s);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const update = async (data: UpdateSettingsInput) => {
    if (!settings) return undefined;
    const updated = await settingsService.update(settings.id, data);
    setSettings(updated);
    return updated;
  };

  return { settings, update };
}
