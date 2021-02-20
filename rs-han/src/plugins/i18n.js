import { createI18n } from "vue-i18n";
import en from "../lang/en";
import vi from "../lang/vi";
const messages = {
  gb: en,
  vn: vi,
};

const i18n = createI18n({
  locale: localStorage.getItem("lang") || "gb",
  fallbacklocale: "gb",
  messages,
});

export default i18n;
