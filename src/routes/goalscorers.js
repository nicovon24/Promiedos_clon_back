const { Router } = require("express");
const router = Router();
const { getGoalscorers } = require("../controllers/index");

router.get("/", (req, res) => getGoalscorers(req, res));

module.exports = router;
