import { Link } from "react-router-dom";
const Header = () => {
	return(
		<header className="w-screen px-6 py-2 bg-neutral-900 h-16 absolute top-0 left-0">
			<div className="w-full flex items-center h-full justify-between">
				<div className="flex gap-6 items-center">
					<p className="text-white text-2xl font-bold tracking-wider leading-tight">PTL</p>
					<div>
						<nav>
							<ul className="flex gap-2">
								<li className="text-white font-medium text-sm">Game Info</li>
								<li className="text-white font-medium text-sm">Leaderboard</li>
								<li className="text-white font-medium text-sm">Support</li>
							</ul>
						</nav>
					</div>
				</div>
				<nav>
					<ul className="flex gap-2">
						<li className="text-neutral-950 font-medium bg-red-500 px-3 py-1 text-center">
							<Link to="/signin" className="text-sm text-white">Play Now</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}

export default Header;
