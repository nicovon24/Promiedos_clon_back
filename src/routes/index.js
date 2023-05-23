const { Router } = require("express");
const router = Router();
const matches = require("./matches");
const positions = require("./positions");
const goalscorers = require("./goalscorers");

router.use("/matches", matches);
router.use("/positions", positions);
router.use("/goalscorers", goalscorers);

module.exports = router;
