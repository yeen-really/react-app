const mongoose = require("mongoose");

const Pollution = new mongoose.Schema(
  {
    // search: { type: String },
		search: { type: String },
		co: { type: String },
		nh3: { type: String },
		no2: { type: String },
		no: { type: String },
		o2: { type: String },
		pm2_5: { type: String },
		pm_10: { type: String },
		so2: { type: String },




    // value: { type: String },
  },
  { collection: "history-query" }
);

const model = mongoose.model("PollutionData", Pollution);

module.exports = model;
