import { fileURLToPath, URL } from 'node:url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { defineConfig } from 'vite'
import { resolve, dirname } from 'node:path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	plugins: [
		vue(),
		VueI18nPlugin({
			include: resolve(dirname(fileURLToPath(import.meta.url)), './path/to/src/i18n/locales/**'),
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		}
	}
})
