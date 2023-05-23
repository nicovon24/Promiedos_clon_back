const axios = require("axios");

const headers = {
	"X-Auth-Token": "6e879fa1181942849dc3f1d6d2a3da94",
};

//*http://localhost:8080/matches?competition=PL
const getAllMatches = async (req, res) => {
	try {
		const { competition, matchday } = req.query;

		let data = [];
		if (competition && !matchday) {
			const response = await axios(
				`http://api.football-data.org/v4/competitions/${competition}/matches`,
				{ headers }
			);
			if (response.data) data = response.data;
		}
		if (competition && matchday) {
			const response = await axios(
				`http://api.football-data.org/v4/competitions/${competition}/matches?matchday=${matchday}`,
				{ headers }
			);
			if (response.data) data = response.data;
		}

		if (data.matches.length > 0) res.status(200).send({ matches: data.matches });
		else throw new Error("No matches found for the matchday " + matchday);
	} catch (err) {
		res.status(200).send({ error: err.message });
	}
};

module.exports = getAllMatches;
