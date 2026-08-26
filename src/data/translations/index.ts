import { czTranslations } from "./cz";
import { enTranslations } from "./en";
import { deTranslations } from "./de";
import { Language, TranslationData } from "./types";

export * from "./types";

export const translations: Record<Language, TranslationData> = {
  cz: czTranslations,
  en: enTranslations,
  de: deTranslations,
};