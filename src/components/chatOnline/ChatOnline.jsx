import axios from "axios";
import { useEffect, useState } from "react";
import "./ChatOnline.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
	const [friends, setFriends] = useState([]);
	const [OnlineFriends, setOnlineFriends] = useState([]);
	useEffect(() => {
		const getFriends = async () => {
			const res = await axios.get("/api/users/friends/" + currentId);
			setFriends(res.data);
		};
		getFriends();
	}, [currentId]);

	useEffect(() => {
		setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
	}, [friends, onlineUsers]);
	const handleClick = async (userClicked) => {
		console.log(`clicked online user so setting chat now`);
		try {
			let res = await axios.get(
				`/api/conversations/find/${currentId}/${userClicked._id}`
			);
			if (!res.data) {
				res = await axios.post("/api/conversations", {
					senderId: currentId,
					receiverId: userClicked._id,
				});
			}
			setCurrentChat(res.data);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="chatOnline">
			{OnlineFriends.map((o) => (
				<div
					key={o._id}
					className="friend"
					onClick={() => handleClick(o)}
				>
					<div className="onlineImgContainer">
						<img
							src={
								o?.profilePicture
									? process.env.PUBLIC_URL + "assets/person/" + o.profilePicture
									: process.env.PUBLIC_URL + "assets/person/noAvatar.png"
							}
							alt=""
						/>
						<div className="onlineBadge"></div>
					</div>
					<span className="onlineName">{o.username}</span>
				</div>
			))}
		</div>
	);
}
