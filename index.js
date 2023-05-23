const app = require("./src/app.js");

require("dotenv").config();

app.listen(process.env.PORT, () => {
	console.log(`Listening at: http://localhost:${process.env.PORT}/`);
});
