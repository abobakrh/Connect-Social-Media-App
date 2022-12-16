import { useEffect, useState } from "react";
import "./Profile.css";
import Leftbar from "../../components/leftbar/Leftbar";
import Navbar from "../../components/navbar/Navbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
	const publicFolder = process.env.PUBLIC_URL;
	const [user, setUser] = useState({});
	const username = useParams().username;
	console.log(`got username and it is ${username}`);
	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(`/api/users?username=${username}`);
			console.log(
				`d5lt fetch user we b3t el request we el response ${res.data}`
			);
			setUser(res.data);
		};
		fetchUser();
	}, [username]);
	return (
		<>
			<Navbar />
			<div className="profile">
				<Leftbar></Leftbar>
				<div className="profileRight">
					<div className="profileRightTop">
						<div className="profileCover">
							<img
								src={
									user.coverPicture
										? publicFolder + "/assets/" + user.coverPicture
										: publicFolder + "/assets/person/noCover.jpg"
								}
								alt=""
								className="profileCoverImg"
							/>
							<img
								src={
									user.profilePicture
										? `/person/${user.profilePicture}`
										: publicFolder + "/assets/person/noAvatar.png"
								}
								alt=""
								className="profileUserImg"
							/>
						</div>
						<div className="profileInfo">
							<h4 className="profileUsername">{user.username}</h4>
							<span className="profileDesc">{user.desc}</span>
						</div>
					</div>
					<div className="profileRightBottom">
						<Feed username={username}></Feed>
						<Rightbar user={user}></Rightbar>
					</div>
				</div>
			</div>
		</>
	);
}
