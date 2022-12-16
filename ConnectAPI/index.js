// initializing important imports ///////
/////////////////////////////////////////
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
/////////////////////////////////////////

// routes //////////////////////////////////
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
////////////////////////////////////////////

// initializing dotenv
dotenv.config();
//////////////////////

//connecting to mongodb ///////////////////////////
mongoose.connect(
	process.env.MONGO_URL,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log("connected to mongo");
	}
);
////////////////////////////////////////////////////

app.use("/", express.static(path.join(__dirname, "../public/assets")));

//middleware //////////////
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
////////////////////////////

//file uploads//////////////
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "../public/assets");
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name);
	},
});
const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
	try {
		return res.status(200).json("File uploaded successfully");
	} catch (error) {
		res.status(400).send(`feh 8lt aho ${error}`);
	}
});
////////////////////////////

// route usage //////////////////
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/posts", postRoute);
/////////////////////////////////

// running server on port 8800 ///////////
app.listen(8800, () => {
	console.log("server is running on port 8800 !");
});
///////////////////////////////////////////
