import { createI18n } from 'vue-i18n'
import en from '@/i18n/locales/en.json'



const i18n = createI18n({
	locale: 'en',
	fallbackLocale: 'en',
	legacy: false,
	globalInjection: true,
	messages: { en }
});


export default i18n;
