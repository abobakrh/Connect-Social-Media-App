import { useEffect } from "react";
import { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import "./Post.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { format } from "timeago.js";

export default function Post({ post }) {
	const [like, setLike] = useState(post.likes.length);
	const [isLiked, setisLiked] = useState(false);
	const [user, setUser] = useState({});
	const { user: currentUser } = useContext(AuthContext);
	const publicUrl = process.env.PUBLIC_URL;

	useEffect(() => {
		setisLiked(post.likes.includes(currentUser._id));
	}, [currentUser._id, post.likes]);
	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(`/api/users?userId=${post.userId}`);
			setUser(res.data);
		};
		fetchUser();
	}, [post.userId]);

	const likeHandler = async () => {
		try {
			await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
		} catch (error) {}
		setLike(isLiked ? like - 1 : like + 1);
		setLike(isLiked ? like - 1 : like + 1);
		setisLiked(!isLiked);
	};
	return (
		<div className="post">
			<div className="postWrapper">
				<div className="postTop">
					<div className="postTopLeft">
						<Link to={`profile/${user.username}`}>
							<img
								src={
									user.profilePicture
										? `/person/${user.profilePicture}`
										: publicUrl + "/assets/person/noAvatar.png"
								}
								alt=""
								className="postProfilePic"
							/>
						</Link>
						<span className="postProfileName">{user.username}</span>
						<span className="postDate">{format(post.createdAt)}</span>
					</div>
					<div className="postTopRight">
						<MoreVert></MoreVert>
					</div>
				</div>
				<div className="postCenter">
					<span className="postCaption">{post.desc}</span>
					<img
						src={`/${post.img}`}
						alt=""
						className="postImg"
					/>
				</div>
				<div className="postBottom">
					<div className="postBottomLeft">
						<img
							src={publicUrl + "/assets/like.png"}
							alt=""
							className="postReactionIcon"
							onClick={likeHandler}
						/>
						<img
							src={publicUrl + "/assets/care.png"}
							alt=""
							className="postReactionIcon"
							onClick={likeHandler}
						/>
						<img
							src={publicUrl + "/assets/heart.png"}
							alt=""
							className="postReactionIcon"
							onClick={likeHandler}
						/>
						<img
							src={publicUrl + "/assets/angry.png"}
							alt=""
							className="postReactionIcon"
							onClick={likeHandler}
						/>
						<span className="postReactionCounter">
							{like} people reacted to this
						</span>
					</div>
					<div className="postBottomRight">
						<span className="postCommentText">
							{post.comments.length} comments
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
