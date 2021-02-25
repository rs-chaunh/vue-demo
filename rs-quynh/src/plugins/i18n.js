import { createI18n } from 'vue-i18n';
import viMessages from "./lang/vn.json";
import enMessages from "./lang/en.json";

const messages = {
    en: enMessages,
    vi: viMessages
}

const i18n = createI18n({
    locale: 'vi',
    fallbackLocale: 'en',
    messages,
})

export default i18n;