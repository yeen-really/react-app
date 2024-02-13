
const cors = require("cors");

const express = require("express");
const app = express();
const jwt = require('jsonwebtoken')
app.use(express.json());
const mongoose = require("mongoose");
const User = require("./models/user");
const Pollution = require("./models/pollution");

app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/users");
// mongoose.connect("mongodb://127.0.0.1:27017/query");

app.post("/cityinfo", async (req, res) => {
	console.log(req.body);
	try {
	  await Pollution.create({
		search: req.body.search,
		co: req.body.co,
		nh3: req.body.nh3,
		no2: req.body.no2,
		no: req.body.no,
		o2: req.body.o2,
		pm2_5: req.body.pm2_5,
		pm_10: req.body.pm_10,
		so2: req.body.so2,

	  });
	  res.json({ status: "ok" });
	} catch (err) {
	  console.log(err);
	  res.json({ status: "error", error: "dublicate username" });
	}
  });

app.post("/auth", async (req, res) => {
  console.log(req.body);
  try {
    await User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "dublicate username" });
  }
});

app.post('/login', async (req, res) => {
	const user = await User.findOne({
		username: req.body.username,
		// password: req.body.password,
	})

	if (user) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})

app.listen(1337, () => {
  console.log(`server running on port 1337`);
});
