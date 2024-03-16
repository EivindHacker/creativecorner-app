export default function getOrderAndID(req, res, next) {
	const {data} = req.params;

	const dataArray = data.split("_");
	req.sortBy = dataArray[0];
	if (dataArray[1] != "undefined") {
		req.creator_id = dataArray[1];
	} else {
		req.creator_id = null;
	}
	next();
}
