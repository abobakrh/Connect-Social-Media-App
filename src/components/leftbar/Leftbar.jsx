import {
	Bookmark,
	CasesOutlined,
	Chat,
	Event,
	GradingOutlined,
	Group,
	PlayCircleFilled,
	QuestionMarkRounded,
	RssFeed,
} from "@mui/icons-material";
import { useContext } from "react";
import "./Leftbar.css";
import { AuthContext } from "../../context/AuthContext";
import CloseFriends from "../closeFriends/CloseFriends";

export default function Leftbar() {
	const { user } = useContext(AuthContext);
	console.log(`user friends are ${user.followings.length}`);
	return (
		<div className="leftbar">
			<div className="leftbarWrapper">
				<ul className="leftbarList">
					<li className="leftbarListItem">
						<RssFeed className="leftbarIcon"></RssFeed>
						<span className="leftbarListItemText">Feed</span>
					</li>
					<li className="leftbarListItem">
						<Chat className="leftbarIcon"></Chat>
						<span className="leftbarListItemText">Chat</span>
					</li>
					<li className="leftbarListItem">
						<PlayCircleFilled className="leftbarIcon"></PlayCircleFilled>
						<span className="leftbarListItemText">Videos</span>
					</li>
					<li className="leftbarListItem">
						<Group className="leftbarIcon"></Group>
						<span className="leftbarListItemText">Groups</span>
					</li>
					<li className="leftbarListItem">
						<Bookmark className="leftbarIcon"></Bookmark>
						<span className="leftbarListItemText">Bookmarks</span>
					</li>
					<li className="leftbarListItem">
						<QuestionMarkRounded className="leftbarIcon"></QuestionMarkRounded>
						<span className="leftbarListItemText">Questions</span>
					</li>
					<li className="leftbarListItem">
						<CasesOutlined className="leftbarIcon"></CasesOutlined>
						<span className="leftbarListItemText">Jobs</span>
					</li>
					<li className="leftbarListItem">
						<Event className="leftbarIcon"></Event>
						<span className="leftbarListItemText">Events</span>
					</li>
					<li className="leftbarListItem">
						<GradingOutlined className="leftbarIcon"></GradingOutlined>
						<span className="leftbarListItemText">Courses</span>
					</li>
				</ul>
				<button className="leftbarButton">Show More</button>
				<hr />
				<ul className="leftbarFriendList">
					{user?.followings.map((u) => (
						<CloseFriends key={u._id} friend={u} />
					))}
				</ul>
			</div>
		</div>
	);
}
