import i18n from "@/i18n"
import { nextTick } from "vue"

const	Trans = {
	supportedLocales : ['en', 'fr', 'ru'],
	// get supportedLocales(){
	// 	return (import.meta.env.I18N_SUPPORTED_LOCALES).split(",")
	// },
	get defaultLocale(){
		return import.meta.env.I18N_LOCALE
	},
	get currentLocale(){
		return i18n.global.locale.value
	},
	set currentLocale(newLocale){
		i18n.global.locale.value = newLocale
	}, 

//what is local language
	isLocaleSupported(locale){
		return Trans.supportedLocales.includes(`${locale}`)
	},
	getUserLocale(){
		const locale = window.navigator.language ||
		window.navigator.userLanguaage ||
		Trans.defaultLocale
		return {
			locale: locale,
			localeNoRegion: locale.split('-')[0]
		}
	},
	getPresistedLocale(){
		const presistedLocale = localStorage.getItem("user-locale")
		if(Trans.isLocaleSupported(presistedLocale)){
			return	presistedLocale
		}
		return null
	},
	guessDefaultLocale(){
		const userPersistedLocale = Trans.getPresistedLocale()
		if(userPersistedLocale){
			return userPersistedLocale
		}
		const userPreferredLocale = Trans.getUserLocale()
		const supportedFullLocale = Trans.isLocaleSupported(userPreferredLocale.locale)
		const supportedJustLocale = Trans.isLocaleSupported(userPreferredLocale.localeNoRegion)
		if (supportedFullLocale){
			return userPreferredLocale.locale
		}
		if(supportedJustLocale){
			return userPreferredLocale.localeNoRegion
		}
	},

//Switch language
	async switchLanguage(newLocale) {
		await Trans.loadLocaleMessages(newLocale)
		Trans.currentLocale = newLocale
		document.querySelector("html").setAttribute("lang", newLocale)
		localStorage.setItem("user-locale", newLocale)
	},
	async loadLocaleMessages(locale){
		if(!i18n.global.availableLocales.includes(locale)) {
			const messages = await import(`@/i18n/locales/${locale}.json`)
			i18n.global.setLocaleMessage(locale, messages.default)
		}
		return nextTick()
	},
//routing
	async routeMiddleware(to, _from, next){
		const paramLocale = to.params.locale
		if (!Trans.isLocaleSupported(paramLocale)) {
			return next(Trans.guessDefaultLocale());
		}
		await Trans.switchLanguage(paramLocale)
		return next()
	},
	i18nRoute(to) {
		return {
			...to,
			params: {
				locale: Trans.currentLocale,
				...to.params
			}
		}
	}
}
export default Trans

