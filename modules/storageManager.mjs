import pg from "pg";

/// TODO: is the structure / design of the DBManager as good as it could be?

class DBManager {
	#credentials = {};

	constructor(connectionString) {
		this.#credentials = {
			connectionString,
			ssl: process.env.DB_SSL === "true" ? process.env.DB_SSL : false,
		};
	}

	async createUser(user) {
		const client = new pg.Client(this.#credentials);

		try {
			await client.connect();
			const output = await client.query(
				'INSERT INTO "public"."Users"("name", "email", "password", "role") VALUES($1::Text, $2::Text, $3::Text, $4::Text) RETURNING id;',
				[user.name, user.email, user.pswHash, user.role]
			);

			if (output.rows.length == 1) {
				user.id = output.rows[0].id;
			}
		} catch (error) {
			console.error(error);
			//TODO : Error handling?? Remember that this is a module seperate from your server
		} finally {
			client.end(); // Always disconnect from the database.
		}

		return user;
	}

	async checkUserExistence(user) {
		const client = new pg.Client(this.#credentials);

		try {
			await client.connect();
			const output = await client.query('SELECT EXISTS (SELECT 1 FROM "public"."Users" WHERE email = $1::Text)', [user.email]);

			console.log(output.rows[0].exists);

			if (output.rows[0].exists) {
				console.log("User already exists");
				return true;
			} else {
				console.log("User does not exists");
				return false;
			}
		} catch (error) {
			console.error(error);
			//TODO : Error handling?? Remember that this is a module seperate from your server
		} finally {
			client.end(); // Always disconnect from the database.
		}
	}

	async login(user) {
		const client = new pg.Client(this.#credentials);

		try {
			await client.connect();
			const output = await client.query('SELECT * from "public"."Users"  where password = $1 AND email = $2;', [user.pswHash, user.email]);
			return output.rows;
			// Client.Query returns an object of type pg.Result (https://node-postgres.com/apis/result)
			// Of special intrest is the rows and rowCount properties of this object.

			//TODO: Did the user get deleted?
		} catch (error) {
			//TODO : Error handling?? Remember that this is a module seperate from your server
		} finally {
			client.end(); // Always disconnect from the database.
		}

		return user;
	}

	async getUserData(user) {
		const client = new pg.Client(this.#credentials);

		try {
			await client.connect();

			const output = await client.query('SELECT * from "public"."Users"  where email = $1 AND password = $2;', [user.email, user.pswHash]);

			console.log(output.rows);

			return output.rows;
		} catch (error) {
			//TODO : Error handling?? Remember that this is a module seperate from your server
		} finally {
			client.end(); // Always disconnect from the database.
		}

		return user;
	}

	async deleteUser(user) {
		const client = new pg.Client(this.#credentials);

		try {
			await client.connect();
			//const output = await client.query('Delete from "public"."Users"  where id = $1;', [user.id]);

			const output = await client.query(
				'UPDATE "public"."Users" SET email = NULL, name = NULL, password = NULL, role = NULL WHERE email = $1 AND password = $2;',
				[user.email, user.pswHash]
			);

			const msg = "User deleted successfully";

			return msg;

			//TODO: Did the user get deleted?
		} catch (error) {
			console.log(error);
		} finally {
			client.end(); // Always disconnect from the database.
		}

		return user;
	}

	async updateUserInfo(user) {
		const client = new pg.Client(this.#credentials);

		try {
			await client.connect();
			const output = await client.query(
				`UPDATE "public"."Users"
				SET "name" = $1::Text, 
					"email" = $2::Text,
					"role" = $3::Text
				WHERE password = $4::Text AND email = $5::Text;`,
				[user.name, user.newEmail, user.role, user.pswHash, user.email]
			);

			if (output.rows.length == 1) {
				// We stored the user in the DB.
				user.id = output.rows[0].id;
			}
		} catch (error) {
			console.error(error);
			//TODO : Error handling?? Remember that this is a module seperate from your server
		} finally {
			client.end(); // Always disconnect from the database.
		}

		return user;
	}

	async getIdeas(idea) {
		const client = new pg.Client(this.#credentials);

		try {
			await client.connect();

			let output = await client.query('SELECT * FROM "public"."Ideas" ORDER BY id DESC;');

			if (idea.id !== "null") {
				console.log("id", idea.id);
				output = await client.query('SELECT * FROM "public"."Ideas" WHERE creator_id = $1::Integer ORDER BY id DESC;', [idea.id]);
			}

			return output.rows;
		} catch (error) {
			//TODO : Error handling?? Remember that this is a module seperate from your server
		} finally {
			client.end(); // Always disconnect from the database.
		}
	}

	async createIdea(idea) {
		const client = new pg.Client(this.#credentials);

		try {
			await client.connect();
			const output = await client.query(
				'INSERT INTO "public"."Ideas"("title", "creator_id", "creator_name", "genres", description) VALUES($1::Text, $2::Integer, $3::Text, $4::Text, $5::Text) RETURNING id;',
				[idea.title, idea.creator_id, idea.creator_name, idea.genres, idea.description]
			);

			if (output.rows.length == 1) {
				idea.id = output.rows[0].id;
			}
		} catch (error) {
			console.error(error);
			//TODO : Error handling?? Remember that this is a module seperate from your server
		} finally {
			client.end(); // Always disconnect from the database.
		}

		return idea;
	}

	async getIdea(idea) {
		const client = new pg.Client(this.#credentials);

		try {
			await client.connect();

			const output = await client.query('SELECT * FROM "public"."Ideas" where id = $1', [idea.id]);

			const aIdea = output.rows[0];

			return aIdea;
		} catch (error) {
			console.error(error);
		} finally {
			client.end();
		}

		return idea;
	}

	async rateIdea(idea) {
		const client = new pg.Client(this.#credentials);

		try {
			await client.connect();

			const output = await client.query(`UPDATE "public"."Ideas" SET "rating" = $1::Text WHERE "id" = $2::Integer;`, [idea.rating, idea.id]);

			if (output.rows.length == 1) {
				idea.id = output.rows[0].id;
			}

			return idea;
		} catch (error) {
			console.error(error);
			//TODO : Error handling?? Remember that this is a module seperate from your server
		} finally {
			client.end(); // Always disconnect from the database.
		}

		return idea;
	}
}

// 1:
let connectionString = process.env.ENVIORMENT == "local" ? process.env.DB_CONNECTIONSTRING_LOCAL : process.env.DB_CONNECTIONSTRING_PROD;

// We are using an enviorment variable to get the db credentials
if (connectionString == undefined) {
	throw "You forgot the db connection string";
}

export default new DBManager(connectionString);
