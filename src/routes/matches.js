const { Router } = require("express");
const router = Router();
const { getAllMatches } = require("../controllers/index");

router.get("/", (req, res) => getAllMatches(req, res));
//http://localhost:8080/matches?competition=PL&matchday=1
//http://localhost:8080/matches?competition=CL&matchday=1
//http://localhost:8080/matches?competition=2019&matchday=1 //*serie A
//http://localhost:8080/matches?competition=BL1&matchday=1  //*bundesliga

module.exports = router;
