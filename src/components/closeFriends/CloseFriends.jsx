import "./CloseFriends.css";
const publicFolder = process.env.PUBLIC_URL;

export default function CloseFriends({ friend }) {
	return (
		<li className="leftbarFriend">
			<img
				src={publicFolder + "/assets/" + friend.profilePicture}
				alt=""
				className="leftbarFriendImg"
			/>
			<span className="leftbarFriendName">{friend.username}</span>
		</li>
	);
}
