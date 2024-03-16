import pg from "pg";
import {ResMsg} from "./responseMessages.mjs";
import {selectFromWhereOrderByQuery, updateWhereQuery, insertValuesQuery} from "../modules/createQueries.mjs";

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

		const query = insertValuesQuery(tableName, columns, values);

		try {
			await client.connect();

			const output = await client.query(query, values);

			if (output.rows.length === 1) {
				return output.rows[0];
			}
		} catch (error) {
			throw new Error(ResMsg.DbMsg.errorUpdatingData);
		} finally {
			client.end();
		}

		return null;
	}

	async updateTable(tableName, columns, values, id) {
		const client = new pg.Client(this.#credentials);

		const query = updateWhereQuery(tableName, columns, values, id);

		try {
			await client.connect();

			const output = await client.query(query, values);

			if (output.rows.length === 1) {
				return output.rows[0];
			}
		} catch (error) {
			throw new Error(ResMsg.DbMsg.errorUpdatingData);
		} finally {
			client.end();
		}

		return null;
	}

	async selectFromTable(tableName, selectColumns, whereColumns, whereValues, sortOrder) {
		const client = new pg.Client(this.#credentials);

		const query = selectFromWhereOrderByQuery(tableName, selectColumns, whereColumns, whereValues, sortOrder);
		try {
			await client.connect();

			const output = await client.query(query, whereValues);

			if (output.rows.length >= 1) {
				return output.rows;
			} else {
				return null;
			}
		} catch (error) {
			throw new Error(ResMsg.DbMsg.errorSelectingData);
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
