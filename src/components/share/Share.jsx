import { useContext } from "react";
import {
	Cancel,
	EmojiEmotions,
	Label,
	PermMedia,
	Room,
} from "@mui/icons-material";
import "./Share.css";
import { AuthContext } from "../../context/AuthContext";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
const PUBLIC_URL = process.env.PUBLIC_URL;

export default function Share() {
	const { user } = useContext(AuthContext);
	const desc = useRef();
	const [file, setFile] = useState(null);
	const submitHandler = async (e) => {
		e.preventDefault();
		const newPost = {
			userId: user._id,
			desc: desc.current.value,
		};
		if (file) {
			const data = new FormData();
			const fileName = `${Date.now()}${file.name}`;
			data.append("name", fileName);
			data.append("file", file);
			newPost.img = fileName;
			try {
				await axios.post("/api/upload", data);
			} catch (error) {
				console.log(error);
			}
		}
		try {
			await axios.post("/posts", newPost);
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="share">
			<div className="shareWrapper">
				<div className="shareTop">
					<img
						src={
							user.profilePicture
								? PUBLIC_URL + "/assets/" + user.profilePicture
								: PUBLIC_URL + "/assets/person/noAvatar.png"
						}
						alt=""
						className="shareProfilePic"
					/>
					<input
						placeholder={"What's in your mind " + user.username + "?"}
						type="text"
						className="shareInput"
						ref={desc}
					/>
				</div>
				<hr />
				{file && (
					<div className="shareImgContainer">
						<img alt="img to upload" src={URL.createObjectURL(file)}></img>
						<Cancel onClick={() => setFile(null)} className="shareCancelImg" />
					</div>
				)}
				<form className="shareBottom" onSubmit={submitHandler}>
					<div className="shareOptions">
						<label htmlFor="file" className="shareOption">
							<PermMedia htmlColor="tomato" className="shareIcon"></PermMedia>
							<span className="shareOptionText">Photo/video</span>
							<input
								style={{ display: "none" }}
								type="file"
								id="file"
								name="file"
								accept=".png , .jpeg , .jpg"
								onChange={(e) => {
									console.log(`file chosen is ${e.target.files[0].name}`);
									setFile(e.target.files[0]);
								}}
							/>
						</label>
						<div className="shareOption">
							<Label htmlColor="blue" className="shareIcon"></Label>
							<span className="shareOptionText">tag</span>
						</div>
						<div className="shareOption">
							<Room htmlColor="green" className="shareIcon"></Room>
							<span className="shareOptionText">location</span>
						</div>
						<div className="shareOption">
							<EmojiEmotions
								htmlColor="goldenrod"
								className="shareIcon"
							></EmojiEmotions>
							<span className="shareOptionText">feelings</span>
						</div>
					</div>
					<button className="shareButton" type="submit">
						Share
					</button>
				</form>
			</div>
		</div>
	);
}
