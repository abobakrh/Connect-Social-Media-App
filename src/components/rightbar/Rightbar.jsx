import "./Rightbar.css";
import Online from "../online/Online";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";

export default function Rightbar({ user }) {
	const publicFolder = process.env.PUBLIC_URL;
	const [friends, setFriends] = useState([]);
	const { user: currentUser, dispatch } = useContext(AuthContext);
	const [followed, setFollowed] = useState(
		currentUser.followings.includes(user?._id)
	);

	useEffect(() => {
		setFollowed(currentUser.followings.includes(user?._id));
	}, [currentUser, user]);

	useEffect(() => {
		const getFriends = async () => {
			try {
				const friendList = await axios.get(`/api/users/friends/${user._id}`);
				setFriends(friendList.data);
			} catch (error) {
				console.log(error);
			}
		};
		user && getFriends();
	}, [user]);
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
			// followed
			// 	? await axios.put(`/api/users/${user._id}/unfollow`, {
			// 			userId: currentUser._id,
			// 	  })
			// 	: await axios.put(`/api/users/${user._id}/follow`, {
			// 			userId: currentUser._id,
			// 	  });
		} catch (error) {
			console.log(error);
		}
		setFollowed(!followed);
	};
	const HomeRightbar = () => {
		const { user } = useContext(AuthContext);
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
				<ul className="rightbarFriendList">
					{user.followings.map((u) => (
						<Online key={u.id} user={u} />
					))}
				</ul>
			</>
		);
	};
	const profileRightbar = () => {
		return (
			<>
				{user.username !== currentUser.username && (
					<button className="rightbarFollowButton" onClick={handleClick}>
						{followed ? <Remove /> : <Add />}
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
						>
							<div className="rightbarFollowing">
								<img
									className="rightbarFollowingImg"
									src={
										friend.profilePicture
											? `/person/${friend.profilePicture}`
											: "/person/noAvatar.png"
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
