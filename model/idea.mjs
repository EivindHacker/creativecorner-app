import DBManager from "../modules/storageManager.mjs";

class Idea {
	constructor() {
		///TODO: Are these the correct fields for your project?
		this.id;
		this.title;
		this.creator_id;
		this.creator_name;
		this.genres;
		this.rating;
		this.creations;
	}

	async createIdea() {
		return await DBManager.createIdea(this);
	}

	async getIdeas() {
		return await DBManager.getIdeas(this);
	}
}

export default Idea;
