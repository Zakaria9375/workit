import sourceData from "@/Data/myData.json";
const registeredUsers = sourceData.users;
export const checkIfUserExistsInDB = (email) => {
	return new Promise((resolve, reject) => {
		const matchingUser = registeredUsers.find((user) => user.email === email);
		setTimeout(() => {
			if (matchingUser) {
				resolve(true);
			} else {
				reject("user not found");
			}
		}, 3000);
	});
};

export const authenticateUser = (email, password) => {
  const validuser = registeredUsers.find((user) => user.email === email && user.password === password);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (validuser) {
				resolve({
					email: validuser.email,
					name: validuser.name,
				});
			} else {
				reject("supplied credentials do not match any user");
			}
		}, 3000);
	});
};

export const postFormToDB = (form) => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(form), 3000);
	});
};
