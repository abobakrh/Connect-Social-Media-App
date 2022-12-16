import "./Online.css";
const publicFolder = process.env.PUBLIC_URL;

export default function Online({ user }) {
	return (
		<li className="rightbarFriend">
			<div className="rightbarProfileImgContainer">
				<img
					src={publicFolder + "/assets/person" + user.profilePicture}
					alt=""
					className="rightbarProfilePic"
				/>
				<span className="rightbarStatus"></span>
			</div>
			<span className="rightbarUsername">{user.username}</span>
		</li>
	);
}
