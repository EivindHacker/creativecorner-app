export function getOrderBy(req, res, next) {
	const {data} = req.params;

	const dataArray = data.split("_");
	req.sortBy = dataArray[0];
	if (dataArray[1] != "undefined") {
		req.orderBy = dataArray[1];
	} else {
		req.orderBy = null;
	}
	next();
}

export function getOrderByAndID(req, res, next) {
	const {data} = req.params;

	const dataArray = data.split("_");
	req.sortBy = dataArray[0];
	req.id = dataArray[1];
	next();
}
