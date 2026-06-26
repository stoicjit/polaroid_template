import en from "@/locales/en.json";
import pa from "@/locales/pa.json";

export const dictionaries = { en, pa };

export type Locale = keyof typeof dictionaries;
export type TranslationDictionary = (typeof dictionaries)[Locale];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return value in dictionaries;
}

export function getDictionary(locale: Locale): TranslationDictionary {
  return dictionaries[locale];
}

export function getNestedValue(
  dictionary: TranslationDictionary,
  key: string,
): string {
  const value = key.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, dictionary);

  return typeof value === "string" ? value : key;
}
