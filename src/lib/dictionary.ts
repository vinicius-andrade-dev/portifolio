import pt from "@/i18n/pt.json";
import en from "@/i18n/en.json";
import es from "@/i18n/es.json";

const dictionaries: Record<string, any> = { pt, en, es };

export function getDictionary(locale: string) {
  return dictionaries[locale] || dictionaries.pt;
}
