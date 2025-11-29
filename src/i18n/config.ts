// https://juejin.cn/post/7486315070362271781
export const languages = {
  en: {
    label: "English",
    nativeLabel: "English",
    description: "English",
  },
  zh: {
    label: "Chinese",
    nativeLabel: "中文",
    description: "Chinese",
  },
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";
export const supportedLanguages = Object.keys(languages) as Lang[];

export const languageSelectOptions = supportedLanguages.map((code) => ({
  code,
  label: languages[code].nativeLabel,
}));
