//I know these functions looks a litle crazy, but i does the job well!

export function selectFromWhereOrderByQuery(tableName, selectColumns, whereColumns, whereValues, sortOrder, orderBy) {
	const selectClause = selectColumns.join(", ");

	let whereClause = "";
	if (whereColumns.length > 0 && whereValues.length > 0) {
		whereClause = "WHERE " + whereColumns.map((_, index) => `"${_}" = $${index + 1}`).join(" AND ");
	}

	let orderByClause = "";

	if (sortOrder === "RANDOM") {
		orderByClause = "ORDER BY RANDOM()";
	} else if (selectColumns.length > 0 && selectColumns[0]) {
		orderByClause = `ORDER BY id ${sortOrder}`;
	}
	if (orderBy === "rating" && orderBy) {
		orderByClause = `ORDER BY ${orderBy} ${sortOrder}`;
	}

	if (sortOrder == undefined) {
		orderByClause = "";
	}

	return `SELECT ${selectClause} FROM "${tableName}" ${whereClause} ${orderByClause}`;
}

export function updateWhereQuery(tableName, columns, values, id) {
	values.push(id);
	const length = values.length;
	const setSql = columns.map((column, index) => `"${column}" = $${index + 1}`).join(", ");
	return `UPDATE "${tableName}" SET ${setSql} WHERE id = $${length} RETURNING *`;
}

export function insertValuesQuery(tableName, columns, values) {
	const columnSql = columns.join(", ");
	const valuesSql = values.map((_, index) => `$${index + 1}`).join(", ");
	return `INSERT INTO "${tableName}"(${columnSql}) VALUES(${valuesSql}) RETURNING *`;
}
