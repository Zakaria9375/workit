import { genesisIcons } from "@formkit/icons"
import '@formkit/themes/genesis'
import {createAutoAnimatePlugin} from '@formkit/addons'
import sourceData from '@/Data/myData.json'
import { reactive } from "vue";
import { createMultiStepPlugin } from '@formkit/addons'
import '@formkit/addons/css/multistep'
import { en, fr, ru } from '@formkit/i18n'

const registeredUsers = reactive(sourceData.users);

const config = {
  plugins: [ createAutoAnimatePlugin(), createMultiStepPlugin()],
  icons: { ...genesisIcons },
	messages: {
		en: { 
			validation: {
				isUnique({node}){
					return `${node.value} is already exist`},
				spaces(){
					return `Field is Empty`
				}
			}
		}
	},
	rules: {
		isUnique(node){
		const registeredEmails = registeredUsers.map((user) => user.email)
    return !registeredEmails.includes(node.value)
		}, 
		spaces(node){
			if(node.value.trim()){
				return true
			}
			return false
		}
	},
	locales: {en, fr, ru},
	locale: 'en'
}

export default config
