import "./Messenger.css";
import Navbar from "../../components/navbar/Navbar";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
import { io } from "socket.io-client";

export default function Messenger() {
	const { user } = useContext(AuthContext);
	const [conversations, setConversations] = useState([]);
	const [currentChat, setCurrentChat] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const scrollRef = useRef();
	const socket = useRef();
	useEffect(() => {
		socket.current = io("ws://localhost:8900");
	}, []);
	useEffect(() => {
		socket.current.on("getMessage", (data) => {
			setArrivalMessage({
				sender: data.senderId,
				text: data.text,
				createdAt: Date.now(),
			});
		});
	}, []);
	useEffect(() => {
		console.log("user changed");
		socket.current.emit("addUser", user._id);
	}, [user]);
	useEffect(() => {
		socket.current.on("getUsers", (users) => {
			setOnlineUsers(
				user.followings.filter((f) => users.some((u) => u.userId === f))
			);
		});
	}, [user]);
	useEffect(() => {
		arrivalMessage &&
			currentChat?.members.includes(arrivalMessage.sender) &&
			setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage, currentChat]);
	useEffect(() => {
		const getConversations = async () => {
			try {
				const res = await axios.get("/api/conversations/" + user._id);
				setConversations(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		getConversations();
	}, [user._id]);

	useEffect(() => {
		const getMessages = async () => {
			try {
				const res = await axios.get("/api/messages/" + currentChat?._id);
				setMessages(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		currentChat && getMessages();
	}, [currentChat]);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const message = {
			sender: user._id,
			text: newMessage,
			conversationId: currentChat._id,
		};
		const receiverId = currentChat.members.find(
			(member) => member !== user._id
		);
		socket.current.emit("sendMessage", {
			senderId: user._id,
			receiverId,
			text: newMessage,
		});
		try {
			const res = await axios.post("/api/messages", message);
			setMessages([...messages, res.data]);
			setNewMessage("");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<Navbar />
			<div className="messenger">
				<div className="chatMenu">
					<div className="wrapper">
						<input placeholder="Search for friends"></input>
						{conversations?.map((c) => (
							<div
								key={c._id}
								onClick={() => {
									setCurrentChat(c);
								}}
							>
								<Conversation
									key={c._id}
									conversation={c}
									currentUser={user}
								></Conversation>
							</div>
						))}
					</div>
				</div>
				<div className="chatBox">
					<div className="wrapper">
						{currentChat ? (
							<>
								<div className="chatBoxTop">
									{messages?.map((m) => (
										<div
											key={m._id}
											ref={scrollRef}
										>
											<Message
												message={m}
												own={m.sender === user._id}
											/>
										</div>
									))}
								</div>
								<div className="chatBoxBottom">
									<textarea
										onChange={(e) => setNewMessage(e.target.value)}
										value={newMessage ? newMessage : ""}
										placeholder="write what you want to say..."
									></textarea>
									<button onClick={handleSubmit}>Send</button>
								</div>
							</>
						) : (
							<span className="noChat">
								Open a conversation to start chatting
							</span>
						)}
					</div>
				</div>
				<div className="chatOnline">
					<div className="wrapper">
						{onlineUsers ? (
							<ChatOnline
								onlineUsers={onlineUsers}
								currentId={user._id}
								setCurrentChat={setCurrentChat}
							/>
						) : (
							<h4>no online friends</h4>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
