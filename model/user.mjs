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
		return await DBManager.insertIntoTable(
			"Users",
			["name", "email", "password", "role", "language"],
			[this.name, this.email, this.pswHash, this.role, this.language]
		);
	}

	async login() {
		return await DBManager.selectFromTable("Users", ["*"], ["password", "email"], [this.pswHash, this.email], this.sortBy);
	}

	async checkUserExistence() {
		return await DBManager.selectFromTable("Users", ["*"], ["email"], [this.email], this.sortBy);
	}

	async getUserData() {
		return await DBManager.selectFromTable("Users", ["*"], ["email"], [this.email], this.sortBy);
	}

	async updateUserInfo() {
		return await DBManager.updateTable("Users", ["name", "email", "role", "language"], [this.name, this.newEmail, this.role, this.language], this.id);
	}
	async updateUserPassword() {
		return await DBManager.updateTable("Users", ["password"], [this.newPass], this.id);
	}

	async delete() {
		return await DBManager.updateTable("Users", ["name", "email", "password", "role"], [null, null, null, null], this.id);
	}
}

export default User;
