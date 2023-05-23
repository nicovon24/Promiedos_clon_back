const { Router } = require("express");
const router = Router();
const { getPositions } = require("../controllers/index");

router.get("/", (req, res) => getPositions(req, res));

module.exports = router;
