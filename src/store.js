import { reactive } from 'vue'
export const store = reactive({
	openPopUp: false,
	togglePopUp(){
		this.openPopUp = !this.openPopUp
	},
	openPopUp2: false,
	togglePopUp2(){
		this.openPopUp2 = !this.openPopUp2
	},
	openPopUp3: false,
	togglePopUp3(){
		this.openPopUp3 = !this.openPopUp3
	},
	closeThePopUp(){
		this.openPopUp = false
		this.openPopUp2 = false
		this.openPopUp3 = false
	},
	isAuthenticated: false,
})