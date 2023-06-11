const axios = require("axios");

const headers = {
	"X-Auth-Token": "6e879fa1181942849dc3f1d6d2a3da94",
};

//*http://localhost:8080/matches?competition=PL
const getGoalscorers = async (req, res) => {
	try {
		const { competition, season, limit } = req.query;
		let data = [];

		if (competition) {
			const response = await axios(
				`http://api.football-data.org/v4/competitions/${competition}/scorers`,
				{ headers }
			);
			if (response.data) data = response.data;
		}
		if (competition && limit) {
			const response = await axios(
				`http://api.football-data.org/v4/competitions/${competition}/scorers?limit=${limit}`,
				{ headers }
			);
			if (response.data) data = response.data;
		}
		if (competition && season && limit) {
			const response = await axios(
				`http://api.football-data.org/v4/competitions/${competition}/scorers?season=${season}&limit=${limit}`,
				{ headers }
			);
			if (response.data) data = response.data;
		}

		data = data.scorers;

		const segmentedByPage = {};
		const separator = 10;

		for (let i = 1; i < Math.floor(data.length / separator); i++) {
			// console.log(i, i * separator, (i + 1) * separator);
			if (i === 1) segmentedByPage[i] = data.slice(0, separator);
			else {
				segmentedByPage[i] = data.slice((i - 1) * separator, i * separator);
			}
		}

		if (data?.length > 0) res.status(200).send({ scorers: segmentedByPage });
		else throw new Error("No goalscorers found");
	} catch (err) {
		res.status(200).send({ error: err.message });
	}
};

module.exports = getGoalscorers;
