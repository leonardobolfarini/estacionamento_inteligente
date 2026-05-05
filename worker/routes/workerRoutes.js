const express = require("express");
const router = express.Router();

const {
  recommendationHandler
} = require("../controllers/recommendationController");

router.get("/api/v1/recommendation", recommendationHandler);

module.exports = router;
