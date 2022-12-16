const router = require("express").Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");

// register
router.post("/register", async (req, res) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		const newUser = await new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		});
		const user = await newUser.save();
		res.status(200).json(user);
	} catch (error) {
		console.log(error);
	}
});

const checkPassword = async (pw2Check, dbPw) => {
	const ans = await bcrypt.compare(pw2Check, dbPw);
	console.log(
		`passwords to compare are ${pw2Check} and ${dbPw} and the result is ${ans}`
	);
	return ans;
};

//Login
router.post("/login", async (req, res) => {
	try {
		console.log(`email to search for is ${req.body.email}`);
		const user = await User.findOne({ email: req.body.email });
		console.log(`found user is ${user?.username}`);
		!user
			? res.status(404).send("user not found").end()
			: (await checkPassword(req.body.password, user.password))
			? res.status(200).json(user).end()
			: res.status(404).send("wrong password").end();
	} catch (error) {
		res
			.status(500)
			.json(`something went wrong and the error was ${error.message}`)
			.end();
	}
});
module.exports = router;
