import Header from "../components/Header.tsx"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"

function Marketing(){
    const [socket, setSocket] = useState()

    useEffect(()=>{
        const newSocket = new WebSocket('ws://localhost:6969'); // Change the URL to your WebSocket server
        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    
    },[])

	return(
		<div className="min-h-screen bg-slate-800 relative">
			<Header />
			<div className="h-screen flex flex-col items-center justify-center">
				<div className="w-full flex flex-col items-center justify-center gap-5">
					<p className="text-white font-medium text-lg">A up-to 5 player decision based game</p>
					<h1 className="text-white font-bold lg:text-7xl md:text-6xl">Perpetual Time Loop</h1>
					<Link to={"/signin"} className="text-white font-medium bg-red-500 w-28 py-1 h-full flex items-center justify-center tracking-tighter">
						Play Now
					</Link>		
					</div>
				</div>
			</div>
	)
}

export default Marketing;
