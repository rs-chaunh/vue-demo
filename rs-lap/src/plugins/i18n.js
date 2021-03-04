import { createI18n } from "vue-i18n";
import vnMessage from ".././languages/vn.json";
import enMessage from ".././languages/en.json";

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
