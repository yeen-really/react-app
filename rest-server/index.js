
const cors = require("cors");

const express = require("express");
const app = express();
const jwt = require('jsonwebtoken')
app.use(express.json());
const mongoose = require("mongoose");
const User = require("./models/user");

app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/users");

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
