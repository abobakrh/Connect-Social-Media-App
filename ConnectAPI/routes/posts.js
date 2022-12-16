const router = require("express").Router();
const Post = require("../models/Posts");
const Users = require("../models/Users");

// create a post
router.post("/", async (req, res) => {
	const newPost = new Post(req.body);
	try {
		const savedPost = await newPost.save();
		res.status(200).json(savedPost);
	} catch (error) {
		res.status(500).json(error);
	}
});
// update a post
router.put("/:postId", async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		if (post.userId === req.body.userId) {
			if (!req.body.userId) {
				await post.updateOne({ $set: req.body });
				res.status(200).json("post updated successfully");
			} else {
				res.status(403).json("you cant post for other users");
			}
		} else {
			res
				.status(403)
				.json("you are not authorized to alter other user's posts");
		}
	} catch (error) {
		res.status(403).json(error);
	}
});
// delete a post
router.delete("/:postId", async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		if (post.userId === req.body.userId) {
			await post.deleteOne();
			res.status(200).json("post deleted successfully");
		} else {
			res
				.status(403)
				.json("you are not authorized to delete other user's posts");
		}
	} catch (error) {
		res.status(403).json(error);
	}
});
// like a post
router.put("/:postId/like", async (req, res) => {
	console.log("inside like route");
	try {
		const post = await Post.findById(req.params.postId);
		if (!post.likes.includes(req.body.userId)) {
			await post.updateOne({ $push: { likes: req.body.userId } });
			res.status(200).json("post has been liked");
		} else {
			await post.updateOne({ $pull: { likes: req.body.userId } });
			res.status(200).json("post has been disliked");
		}
	} catch (error) {
		res.status(403).send(`error and msg is ${error}`);
	}
});
// get a post
router.get("/:postId", async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		if (post.userId === req.body.userId) {
			res.status(200).json(post);
		} else {
			res.status(404).json("post not found");
		}
	} catch (error) {
		res.status(500).json(error);
	}
});
// get timeline posts
router.get("/timeline/:userId", async (req, res) => {
	try {
		console.log(`fetching timeline posts for userid ${req.params.userId}`);
		const currentUser = await Users.findById(req.params.userId);
		const userPosts = await Post.find({ userId: currentUser._id });
		const friendsPosts = await Promise.all(
			currentUser.followings.map((friendId) => {
				return Post.find({ userId: friendId });
			})
		);
		res.status(200).json(userPosts.concat(...friendsPosts));
	} catch (error) {
		res.status(500).send(`something went wrong and error is ${error}`);
	}
});
// get user's entire posts
router.get("/profile/:username", async (req, res) => {
	console.log(`getting all posts for profile of ${req.params.username}`);
	try {
		const currentUser = await Users.findOne({ username: req.params.username });
		const userPosts = await Post.find({ userId: currentUser._id });
		res.status(200).json(userPosts);
	} catch (error) {
		res.status(500).send(`error`);
	}
});

module.exports = router;
