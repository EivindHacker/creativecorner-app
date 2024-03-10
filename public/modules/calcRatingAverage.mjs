export default function calcRatingAverage(ratingString) {
	let ratingAverage;

	if (ratingString) {
		const ratings = ratingString.split(",");
		let total = 0;

		ratings.forEach((rating) => {
			total += parseInt(rating);
		});

		return (ratingAverage = (total / ratings.length).toFixed(1));
	}
}
