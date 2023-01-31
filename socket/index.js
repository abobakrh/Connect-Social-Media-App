const io = require("socket.io")(8900, {
	cors: {
		origin: "http://localhost:3000",
	},
});

let users = [];

const addUser = (userId, socketId) => {
	const userExists = users.some((user) => user.userId === userId);
	if (userExists) {
		users = users.filter((user) => user.userId !== userId);
		users.push({ userId, socketId });
	} else users.push({ userId, socketId });
};

// const addUser = (userId, socketId) => {
// 	!users.some((user) => user.userId === userId) &&
// 		users.push({ userId, socketId });
// };

const removeUser = (socketId) => {
	users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
	return users.find((user) => user.userId === userId);
};

//connected
io.on("connection", (socket) => {
	console.log("user connected");
	//take user and socket id from user
	socket.on("addUser", (userId) => {
		addUser(userId, socket.id);
		console.log(`users array is ${users}`);
		io.emit("getUsers", users);
	});

	//send and get message
	socket.on("sendMessage", ({ senderId, receiverId, text }) => {
		const user = getUser(receiverId);
		io.to(user.socketId).emit("getMessage", {
			senderId,
			text,
		});
	});

	//disconnected
	socket.on("disconnect", () => {
		console.log("user disconnected");
		removeUser(socket.id);
		io.emit("getUsers", users);
	});
});
