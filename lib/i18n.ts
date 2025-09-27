import type { Lang } from "@/types/craft";

export { pickLang } from "@/types/craft";

export function ensureLang<T>(value: T | string): string {
  return typeof value === "string" ? value : String(value);
}

export type { Lang };
