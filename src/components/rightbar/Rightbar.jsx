import "./Rightbar.css";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";
import { io } from "socket.io-client";
import ChatOnline from "../chatOnline/ChatOnline";

export default function Rightbar({ user }) {
	const publicFolder = process.env.PUBLIC_URL;
	const { user: currentUser, dispatch } = useContext(AuthContext);
	const [friends, setFriends] = useState([]);
	const [followed, setFollowed] = useState(
		currentUser.followings.includes(user?._id)
	);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const socket = useRef();

	useEffect(() => {
		socket.current = io("ws://localhost:8900");
	}, []);

	useEffect(() => {
		setFollowed(currentUser.followings.includes(user?._id));
	}, [currentUser, user]);

	useEffect(() => {
		socket.current.emit("addUser", currentUser._id);
	}, [currentUser]);
	useEffect(() => {
		socket.current.on("getUsers", (users) => {
			setOnlineUsers(
				currentUser.followings.filter((f) => users.some((u) => u.userId === f))
			);
		});
	}, [currentUser]);

	useEffect(() => {
		const getFriends = async () => {
			try {
				const res = await axios.get(`/api/users/friends/${currentUser._id}`);
				setFriends(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		currentUser && getFriends();
	}, [currentUser]);
	const handleClick = async () => {
		try {
			if (followed) {
				await axios.put(`/api/users/${user._id}/unfollow`, {
					userId: currentUser._id,
				});
				dispatch({ type: "UnFollow", payload: user._id });
			} else {
				await axios.put(`/api/users/${user._id}/follow`, {
					userId: currentUser._id,
				});
				dispatch({ type: "Follow", payload: user._id });
			}
		} catch (error) {
			console.log(error);
		}
		setFollowed(!followed);
	};
	const HomeRightbar = () => {
		return (
			<>
				<div className="birthdayContainer">
					<img
						className="birthdayImg"
						src={publicFolder + "/assets/gift.png"}
						alt=""
					/>
					<span className="birthdayText">
						<b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
					</span>
				</div>
				<img
					src={publicFolder + "/assets/ad.png"}
					alt=""
					className="rightbarAd"
				/>
				<h4 className="rightbarTitle">Online Friends</h4>
				<div className="rightbarFriendList">
					{onlineUsers ? (
						<ChatOnline
							onlineUsers={onlineUsers}
							currentId={currentUser._id}
						/>
					) : (
						<h4>no online friends</h4>
					)}
				</div>
			</>
		);
	};
	const profileRightbar = () => {
		return (
			<>
				{user.username !== currentUser.username && (
					<button
						className="rightbarFollowButton"
						onClick={handleClick}
					>
						{followed ? <Add /> : <Remove />}
						{followed ? "follow" : "unfollow"}
					</button>
				)}
				<h4 className="rightbarTitle">User Information</h4>
				<div className="rightbarInfo">
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">City :</span>
						<span className="rightbarInfoValue">{user.city}</span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">from :</span>
						<span className="rightbarInfoValue">{user.from}</span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">Relationship :</span>
						<span className="rightbarInfoValue">
							{user.relationship === 1
								? "Singe"
								: user.relationship === 2
								? "married"
								: "-"}
						</span>
					</div>
				</div>
				<h4 className="rightbarTitle">User friends</h4>
				<div className="rightbarFollowings">
					{friends.map((friend) => (
						<Link
							to={`/profile/${friend.username}`}
							style={{ textDecoration: "none" }}
							key={friend._id}
						>
							<div
								key={friend._id}
								className="rightbarFollowing"
							>
								<img
									className="rightbarFollowingImg"
									src={
										friend.profilePicture
											? `${process.env.PUBLIC_URL}/assets/person/${friend.profilePicture}`
											: process.env.PUBLIC_URL + "/assets/person/noAvatar.png"
									}
									alt=""
								/>
								<span className="rightbarFollowingName">{friend.username}</span>
							</div>
						</Link>
					))}
				</div>
			</>
		);
	};
	return (
		<div className="rightbar">
			<div className="rightbarWrapper">
				{user ? profileRightbar() : HomeRightbar()}
			</div>
		</div>
	);
}
