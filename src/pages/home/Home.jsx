import Leftbar from "../../components/leftbar/Leftbar";
import Navbar from "../../components/navbar/Navbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./Home.css";

export default function Home() {
	return (
		<>
			<Navbar />
			<div className="homeContainer">
				<Leftbar></Leftbar>
				<Feed></Feed>
				<Rightbar></Rightbar>
			</div>
		</>
	);
}
