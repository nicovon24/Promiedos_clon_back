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

		if (data?.scorers?.length > 0)
			res.status(200).send({ scorers: data.scorers });
		else throw new Error("No goalscorers found");
	} catch (err) {
		res.status(200).send({ error: err.message });
	}
};

module.exports = getGoalscorers;
