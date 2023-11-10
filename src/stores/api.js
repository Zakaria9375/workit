import sourceData from "@/Data/myData.json";
import { reactive } from 'vue';
const registeredUsers = reactive(sourceData.users);

export const api = reactive({
	matchingUser(email) {
		return registeredUsers.find((user) => user.email === email)
	},
	validUser(email, password) {
		return registeredUsers.find((user) => user.email === email && user.password === password)
	},
	checkIfUserExistsInDB(email) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (this.matchingUser(email)) {
					resolve('email exist in db');
				} else {
					reject("user not found");
				}
			}, 1500);
		})
	},
	authenticateUser(email, password) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (this.validUser(email, password)) {
					resolve(this.validUser(email, password));
				} else {
					reject("supplied credentials do not match any user");
				}
			}, 2500);
		})
	},
	postFormToDB (form) {
		return new Promise((resolve) => {
			setTimeout(() => resolve(form), 3000);
		});
	}
})