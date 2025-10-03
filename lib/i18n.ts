import type { Lang } from "@/types/types";

export { pickLang } from "@/types/types";

export function ensureLang<T>(value: T | string): string {
  return typeof value === "string" ? value : String(value);
}

export type { Lang };
