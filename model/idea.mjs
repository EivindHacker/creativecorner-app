import DBManager from "../modules/storageManager.mjs";
import deleteIdea from "../public/modules/idea/deleteIdea.mjs";

class Idea {
	constructor() {
		///TODO: Are these the correct fields for your project?
		this.id;
		this.title;
		this.creator_id;
		this.creator_name;
		this.genres;
		this.rating;
		this.rated_by;
		this.creations;
	}

	async createIdea() {
		return await DBManager.insertIntoTable(
			"Ideas",
			["title", "creator_id", "creator_name", "genres", "description"],
			[this.title, this.creator_id, this.creator_name, this.genres, this.description]
		);
	}

	async updateIdea() {
		return await DBManager.updateTable(
			"Ideas",
			["title", "creator_name", "genres", "description"],
			[this.title, this.creator_name, this.genres, this.description],
			this.id
		);
	}

	async deleteIdea() {
		return await DBManager.updateTable(
			"Ideas",
			["title", "creator_name", "genres", "description", "creator_id", "rating", "creations", "rated_by"],
			[null, null, null, null, null, null, null, null],
			this.id
		);
	}

	async getIdeas() {
		return await DBManager.getIdeas(this);
	}

	async getIdea() {
		return await DBManager.getIdea(this.id);
	}

	async rateIdea() {
		return await DBManager.rateIdea(this);
	}
}

export default Idea;
