import DBManager from "../modules/storageManager.mjs";

class User {
	constructor() {
		///TODO: Are these the correct fields for your project?
		this.email;
		this.pswHash;
		this.name;
		this.id;
		this.role;
	}

	async createUser() {
		/// TODO: What happens if the DBManager fails to complete its task?
		if (this.id == null) {
			return await DBManager.createUser(this);
		} else {
			return await DBManager.updateUser(this);
		}
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
		return await DBManager.updateUserInfo(this);
	}
	async updateUserPassword() {
		return await DBManager.updateUserPassword(this);
	}

	async delete() {
		return await DBManager.deleteUser(this);
	}
}

export default User;
