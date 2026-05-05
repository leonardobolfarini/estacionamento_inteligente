const {
  getSectorsStatus,
  saveRecommendation
} = require("../repositories/parkingRepository");

const { getRecommendation } = require("../services/recommendationService");

async function recommendationHandler(req, res) {
  try {
    const { fromSector } = req.query;

    if (!fromSector) {
      return res.status(400).json({
        error: "fromSector is required"
      });
    }

    const sectors = await getSectorsStatus();

    const recommendation = getRecommendation(fromSector, sectors);

    if (!recommendation) {
      return res.json({
        message: "No recommendation needed"
      });
    }

    await saveRecommendation(recommendation);

    return res.json(recommendation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal error" });
  }
}

module.exports = { recommendationHandler };
