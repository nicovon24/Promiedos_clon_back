const axios = require("axios");

const headers = {
	"X-Auth-Token": "6e879fa1181942849dc3f1d6d2a3da94",
};

//*http://localhost:8080/positions?competition=PL&season=2020
const getPositions = async (req, res) => {
	try {
		const { competition, season } = req.query;

		let data = [];
		if (competition) {
			const response = await axios(
				`http://api.football-data.org/v4/competitions/${competition}/standings`,
				{ headers }
			);
			if (response.data) data = response.data;
		}
		if (competition && season) {
			const response = await axios(
				`http://api.football-data.org/v4/competitions/${competition}/standings?season=${season}`,
				{ headers } //*there is after 2020
			);
			if (response.data) data = response.data;
		}

		if (data?.standings?.length > 0) res.status(200).send({ positions: data });
		else throw new Error("No matches found for the matchday " + matchday);
	} catch (err) {
		res.status(200).send({ error: err.message });
	}
};

module.exports = getPositions;
