import pg from "pg";
import {ResMsg} from "./responseMessages.mjs";
import {selectFromWhereOrderByQuery, updateWhereQuery, insertValuesQuery} from "../modules/createQueries.mjs";

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
			} else {
				throw new Error(ResMsg.DbMsg.errorUpdatingData);
			}
		} catch (error) {
			throw new Error(error.message);
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
			} else {
				throw new Error(ResMsg.DbMsg.errorUpdatingData);
			}
		} catch (error) {
			throw new Error(error.message);
		} finally {
			client.end();
		}
	}

	async selectFromTable(tableName, selectColumns, whereColumns, whereValues, sortOrder, orderBy) {
		const client = new pg.Client(this.#credentials);

		const query = selectFromWhereOrderByQuery(tableName, selectColumns, whereColumns, whereValues, sortOrder, orderBy);
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
