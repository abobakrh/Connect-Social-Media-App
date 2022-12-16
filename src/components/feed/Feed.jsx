import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Post from "../post/Post";
import Share from "../share/Share";
import "./Feed.css";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
	const { user } = useContext(AuthContext);
	console.log(`ana fel feed we a5dt username : ${username}`);
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		const fetchPosts = async () => {
			const res = username
				? await axios.get(`/posts/profile/${username}`)
				: await axios.get(`/posts/timeline/${user._id}`);
			setPosts(
				res.data.sort((p1, p2) => {
					return new Date(p2.createdAt) - new Date(p1.createdAt);
				})
			);
			console.log(`feed for user is ${res.data}`);
		};
		fetchPosts();
	}, [username, user._id]);
	return (
		<div className="feed">
			<div className="feedWrapper">
				{username ? username === user.username && <Share /> : <Share />}
				{posts.map((p) => (
					<Post key={p._id} post={p}></Post>
				))}
			</div>
		</div>
	);
}
