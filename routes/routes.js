const express = require("express");
const router = express.Router();

const controller = require("../controller/controller");

router.get("/", controller.index);

router.get("/generator", controller.generator);

router.get("/detail", controller.detail);

module.exports = router;


