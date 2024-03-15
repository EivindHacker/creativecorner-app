import pg from "pg";
import {ResMsg} from "./responseMessages.mjs";

/// TODO: is the structure / design of the DBManager as good as it could be?

class DBManager {
	#credentials = {};

	constructor(connectionString) {
		this.#credentials = {
			connectionString,
			ssl: process.env.DB_SSL === "true" ? process.env.DB_SSL : false,
		};
	}

	async insertIntoTable(tableName, columns, values) {
		const client = new pg.Client(this.#credentials);

		try {
			await client.connect();

			// Construct the SQL query dynamically based on input parameters
			const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");
			const query = `INSERT INTO "${tableName}"(${columns.join(", ")}) VALUES(${placeholders}) RETURNING *`;

			const output = await client.query(query, values);

			if (output.rows.length === 1) {
				// Assuming that the inserted row contains an 'id' column
				return output.rows[0];
			}
		} catch (error) {
			console.error(error);
			// TODO: Error handling
		} finally {
			client.end();
		}

		return null; // Return null if insertion fails
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

			const output = await client.query('SELECT * from "public"."Users"  where email = $1', [user.email]);

			return output.rows[0];
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

			if (output.rows.length == 1) {
				const msg = "User deleted successfully";

				return msg;
			}

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
				WHERE email = $4::Text;`,
				[user.name, user.newEmail, user.role, user.email]
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

	async updateUserPassword(user) {
		const client = new pg.Client(this.#credentials);

		try {
			await client.connect();

			console.log(user.newPass, user.email);

			const output = await client.query(
				`UPDATE "public"."Users"
				SET password = $1
				WHERE email = $2`,
				[user.newPass, user.email]
			);

			console.log(user.newPass, user.email);

			if (output.rows.length == 1) {
				// We stored the user in the DB.
				user.id = output.rows[0].id;
			}
		} catch (error) {
			throw error; // Re-throw the error for handling in the calling code
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

	async getIdea(idea) {
		const client = new pg.Client(this.#credentials);

		try {
			await client.connect();

			const output = await client.query('SELECT * FROM "public"."Ideas" WHERE id = $1', [idea.id]);

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

			const output = await client.query(`UPDATE "public"."Ideas" SET "rating" = $1::Text, "rated_by" = $2::Text WHERE "id" = $3::Integer;`, [
				idea.rating,
				idea.rated_by,
				idea.id,
			]);

			if (output.rows.length == 1) {
				idea.rating = output.rows[0].rating;
				idea.rated_by = output.rows[0].rated_by;
			}

			return idea;
		} catch (error) {
			throw new Error(ResMsg.DbMsg.errorUpdatingData);
		} finally {
			client.end();
		}
	}
}

let connectionString = process.env.ENVIORMENT == "local" ? process.env.DB_CONNECTIONSTRING_LOCAL : process.env.DB_CONNECTIONSTRING_PROD;

if (connectionString == undefined) {
	throw "You forgot the db connection string";
}

export default new DBManager(connectionString);
