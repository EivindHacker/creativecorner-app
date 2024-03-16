import DBManager from "../modules/storageManager.mjs";

class User {
	constructor() {
		///TODO: Are these the correct fields for your project?
		this.email;
		this.pswHash;
		this.name;
		this.id;
		this.role;
		this.token;
	}

	async createUser() {
		return await DBManager.insertIntoTable("Users", ["name", "email", "password", "role"], [this.name, this.email, this.pswHash, this.role]);
	}

	async login() {
		return await DBManager.login(this);
	}

	async checkUserExistence() {
		return await DBManager.checkUserExistence(this);
	}

	async getUserData() {
		return await DBManager.getUserData(this);
	}

	async updateUserInfo() {
		return await DBManager.updateTable("Users", ["name", "email", "role"], [this.name, this.newEmail, this.role], this.id);
	}
	async updateUserPassword() {
		return await DBManager.updateTable("Users", ["password"], [this.newPass], this.id);
	}

	async delete() {
		return await DBManager.updateTable("Users", ["name", "email", "password", "role"], [null, null, null, null], this.id);
	}
}

export default User;
