import {
    createI18n
} from 'vue-i18n';
import {
    en
} from '../languages/en'
import {
    vn
} from '../languages/vn'

const messages = {
    vn: vn,
    gb: en
}

const i18n = createI18n({
    locale: localStorage.getItem('lang'),
    fallbackLocale: 'en',
    messages
})

export default i18n