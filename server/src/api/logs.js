const { Router } = require("express");
const TravelLog = require("../models/travelLog");

const router = Router();

// returns all docs in the database
router.get("/", async (req, res, next) => {
  try {
    const logs = await TravelLog.find({});
    res.json(logs);
  } catch (error) {
    next(error);
  }
});

// adds a log entry to the database
router.post("/", async (req, res, next) => {
  try {
    const travelLog = new TravelLog(req.body);
    const log = await travelLog.save();
    res.json(log);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400);
    }
    next(error);
  }
});

module.exports = router;
