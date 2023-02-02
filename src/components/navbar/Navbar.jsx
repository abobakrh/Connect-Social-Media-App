import "./Navbar.css";
import { Chat, Notifications, Person, Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const publicUrl = process.env.PUBLIC_URL;

export default function Navbar() {
	const { user } = useContext(AuthContext);
	return (
		<div className="navbarContainer">
			<div className="navbarLeft">
				<Link
					to="/"
					style={{ textDecoration: "none" }}
				>
					<p className="logo">Connect</p>
				</Link>
			</div>
			<div className="navbarCenter">
				<div className="searchBar">
					<Search className="searchIcon" />
					<input
						placeholder="Search for friend , post , .....etc"
						type="text"
						className="searchInput"
					/>
				</div>
			</div>
			<div className="navbarRight">
				<div className="navbarLinks">
					<span className="navbarLink">Homepage</span>
					<span className="navbarLink">Timeline</span>
				</div>
				<div className="navIcons">
					<div className="navbarIcons">
						<div className="navbarItem">
							<Person />
							<span className="navbarItemCount">1</span>
						</div>
					</div>
					<div className="navbarIcons">
						<div className="navbarItem">
							<Link to="/messenger">
								<Chat />
								<span className="navbarItemCount">1</span>
							</Link>
						</div>
					</div>
					<div className="navbarIcons">
						<div className="navbarItem">
							<Notifications />
							<span className="navbarItemCount">1</span>
						</div>
					</div>
				</div>
				<Link to={"/profile/" + user.username}>
					<img
						src={
							user.profilePicture
								? publicUrl + "/assets/person/" + user.profilePicture
								: publicUrl + "/assets/person/noAvatar.png"
						}
						alt=""
						className="navbarProfilePic"
					/>
				</Link>
			</div>
		</div>
	);
}
