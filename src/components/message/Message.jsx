import "./Message.css";
import { format } from "timeago.js";

export default function Message({ message, own }) {
	return (
		<div className={own ? "message own" : "message"}>
			<div className="messageTop">
				<img
					src="/assets/person/1.jpeg"
					alt=""
				/>
				<p>{message.text}</p>
			</div>
			<div className="messageBottom">
				<p>{format(message.createdAt)}</p>
			</div>
		</div>
	);
}
