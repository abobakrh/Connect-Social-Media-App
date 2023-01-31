import "./CloseFriends.css";
const publicFolder = process.env.PUBLIC_URL;

export default function CloseFriends({ friend }) {
	return (
		<li className="leftbarFriend">
			<img
				src={process.env.PUBLIC_URL + "/assets/person/" + friend.profilePicture}
				alt=""
				className="leftbarFriendImg"
			/>
			<span className="leftbarFriendName">{friend.username}</span>
		</li>
	);
}
