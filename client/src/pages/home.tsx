import { Link } from "react-router-dom"
import { useState } from "react"
import { AiOutlineArrowRight } from "react-icons/ai"
import bg from '../assets/bg.jpg'
const Home = () => {

	const [username, setUsername] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [error, setError] = useState<string>("")

	async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
		e.preventDefault()
		setError("")
		// TODO: profanaty filter
		validateUsername(username)
		validatePassword(password)
		if(!error.length){
			setUsername("")
			setPassword("")
			console.log(username,password)
		}
		const res = await fetch("http://localhost:3000/auth/signup",{
			method:	"POST",
			headers: {
				"Content-Type":"application/json"
			},
			body:JSON.stringify({
				username: username,
				password: password
			})
		})
		console.log(res.status)
	}


	function validateUsername(username: string){
		if(username.length < 3 || username.length > 20){
			setError("Username must be between 3-20 long")
		}
	}

	function validatePassword(password: string){
		const symbolRegex: RegExp = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/;
		if(password.length < 8 || password.length > 32){
			setError("Password must be between 8-32 long")
		}
        return symbolRegex.test(password)
	}

	return(
		<div className="relative min-w-screen min-h-screen bg-slate-800 flex items-center justify-center">
			<div className="w-[1280px] overflow-hidden h-[768px] bg-slate-500 rounded-md flex">
				<div className="w-1/3 h-full bg-gray-100 flex flex-col items-center justify-center relative">
					<div><p className="text-3xl font-extrabold absolute top-10 left-14">PTL</p></div>
					<div className="flex flex-col gap-6">
						<p className="text-2xl font-bold tracking-wide">Sign in with your account</p>
                        {
                            error && <p className="bg-red-600 h-8 flex items-center justify-center text-white rounded">{ error }</p>
                        }
						<form onSubmit={handleSubmit} className="flex flex-col gap-4">
							<div className="flex flex-col gap-4">
							<fieldset className="relative w-72 border rounded-md">
								<p className="text-xs font-medium absolute top-[0.3rem] left-1">Email</p>
								<input className="px-1 pt-6 pb-2 outline-black w-full rounded-md" placeholder="Email" type="email" />
							</fieldset>
							<fieldset className="relative w-72 border rounded-md">
								<p className="text-xs font-medium absolute top-[0.3rem] left-1">Password</p>
								<input className="px-1 pt-6 pb-2 outline-black w-full rounded-md" placeholder="Password" type="password" />
							</fieldset>
							</div>
							<div className="flex gap-1 items-center">
								<input type="checkbox" className="accent-red-500" />
								<p>Remember Me</p>
							</div>
							<div className="my-1"></div>
							<button
								type="submit" 
								className="h-12 w-12 bg-red-500 text-2xl font-medium rounded-lg mx-auto flex items-center justify-center">
									<AiOutlineArrowRight className="text-white" />
							</button>
						</form>
						<div className="flex flex-col gap-2 absolute bottom-12">
							<Link to={'/'} className="text-xs font-bold text-gray-500">CREATE A ACCOUNT</Link>
							<Link   to={'/'} className="text-xs font-bold text-gray-500">CAN'T SIGN IN?</Link>
						</div>
					</div>
				</div>	
				<div className="w-2/3 h-full bg-red-200">
					<img src={bg} className="w-full h-full object-cover" />	
				</div>	
			</div>		
		</div>
	)
}

export default Home
