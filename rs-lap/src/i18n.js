import { createI18n } from "vue-i18n";
import vnMessage from "./lang/vn.json";
import enMessage from "./lang/en.json";

const messages = {
    vi: vnMessage,
    en: enMessage
};

const i18n = createI18n({
    locale: "en", 
    messages,
    fallbackLocale: "vi"
});

export default i18n;
