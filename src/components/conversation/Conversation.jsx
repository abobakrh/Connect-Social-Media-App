import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./Conversation.css";

export default function Conversation({ conversation, currentUser }) {
	const [user, setUser] = useState(null);
	// console.log("in conversations component");
	useEffect(() => {
		// console.log("inside conversation component use effect");
		const friendId = conversation.members.find((m) => m !== currentUser._id);
		console.log(`friend id is ${friendId}`);
		const getUser = async () => {
			try {
				const res = await axios(`/api/users?userId=${friendId}`);
				setUser(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		getUser();
		console.log(`friends info ${user}`);
	}, [conversation, currentUser]);
	return (
		<div className="conversation">
			<img
				src={
					user?.profilePicture
						? process.env.PUBLIC_URL + "/assets/person/" + user.profilePicture
						: process.env.PUBLIC_URL + "/assets/person/noAvatar.png"
				}
				alt="img"
			></img>
			<span>{user?.username}</span>
		</div>
	);
}
