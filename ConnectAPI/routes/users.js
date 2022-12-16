const router = require("express").Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const { response } = require("express");

// update user info
router.put("/:id", async (req, res) => {
	if (req.params.id === req.body.userId || req.body.isAdmin) {
		if (req.body.password) {
			try {
				const salt = await bcrypt.genSalt(10);
				req.body.password = bcrypt.hash(req.body.password, salt);
			} catch (error) {
				return res.status(500).json(error);
			}
		}
		try {
			const user = await User.findByIdAndUpdate(req.body.userId, {
				$set: req.body,
			});
			return res.status(200).json("user has been updated");
		} catch (error) {
			return res.status(500).json(error);
		}
	}
});

// delete user account
router.delete("/:id", async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		try {
			await User.findByIdAndDelete(req.body.userId);
			res.status(200).json("user deleted");
		} catch (error) {
			return res.status(500).json(error);
		}
	} else {
		res.status(500).json("you can delete your account only");
	}
});

// get user by id or name
router.get("/", async (req, res) => {
	console.log(
		`inside get user by name or id name = ${req.query.username} and id = ${req.query.userId}`
	);
	const userId = req.query.userId;
	const username = req.query.username;
	try {
		const user = userId
			? await User.findById(userId)
			: await User.findOne({ username: username });
		const { password, UpdatedAt, ...other } = user._doc;
		res.status(200).json(other);
	} catch (error) {
		res.status(404).send(`something went wrong: ${error}`);
	}
});

//get all friends
router.get("/friends/:userId", async (req, res) => {
	try {
		const user = await User.findById(req.params.userId);
		const friends = await Promise.all(
			user.followings.map((friendId) => {
				return User.findById(friendId);
			})
		);
		let friendList = [];
		friends.map((friend) => {
			const { _id, username, profilePicture } = friend;
			friendList.push({ _id, username, profilePicture });
		});
		res.status(200).json(friendList);
	} catch (error) {
		res.status(500).send(`feeh error 7sl aho ${error}`);
	}
});

// follow a user
router.put("/:id/follow", async (req, res) => {
	if (!req.body.userId === req.params.id) {
		const currentUser = await User.findById(req.body.userId);
		const userToFollow = await User.findById(req.params.id);
		if (!userToFollow.followers.includes(req.body.userId)) {
			await userToFollow.updateOne({ $push: { followers: req.body.userId } });
			await currentUser.updateOne({ $push: { followings: req.params.id } });
			res.status(200).json("user has been followed");
		}
	} else {
		res.status(403).json("you cant follow yourself");
	}
});

// unfollow a user
router.put("/:id/unfollow", async (req, res) => {
	if (!req.body.userId === req.params.id) {
		const currentUser = await User.findById(req.body.userId);
		const userToUnfollow = await User.findById(req.params.id);
		if (userToUnfollow.followers.includes(req.body.userId)) {
			await userToUnfollow.updateOne({ $pull: { followers: req.body.userId } });
			await currentUser.updateOne({ $pull: { followings: req.params.id } });
			res.status(200).json("user has been unfollowed");
		}
	} else {
		res.status(403).json("you cant unfollow yourself");
	}
});
module.exports = router;
