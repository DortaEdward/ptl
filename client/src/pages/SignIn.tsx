import { Link } from "react-router-dom"
import { useState } from "react"

const SignIn = () => {

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
		console.log(symbolRegex)	
	}

	return(
		<div className="relative min-w-screen min-h-screen bg-slate-800 flex items-center justify-center">
			<div className="absolute top-8 left-8 border-2 px-2 py-1 rounded text-white font-medium">
				<Link to={"/"}>
					{"<- Back"}
				</Link>
			</div>
			<div className="shadow-2xl w-96 h-96 p-8 rounded relative flex flex-col justify-center bg-slate-700">
				<h1 className="text-4xl text-white mb-8">Sign In</h1>
				{
					error && <p className="bg-red-800 text-white px-2 py-1 text-center absolute -top-10 w-[318px] rounded font-medium">{error}</p>
				}
				<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
					<fieldset className="flex flex-col gap-1">
						<label htmlFor="username" className="text-white text-2xl">Username</label>
						<input
							placeholder="Username" 
							type="text" required 
							className="px-2 py-1 outline-none rounded"
							value={username}
							onChange={(e:React.FormEvent<HTMLInputElement>)=> setUsername(e.currentTarget.value)}
						/>
					</fieldset>
					<fieldset className="flex flex-col gap-1">
						<label htmlFor="password" className="text-white text-2xl">Password</label>
						<input
							placeholder="Password"
							className="px-2 py-1 outline-none rounded"
							type="password" required
							value={password}
							onChange={(e:React.FormEvent<HTMLInputElement>)=> setPassword(e.currentTarget.value)}
						/>
					</fieldset>
					<button className="bg-red-500 w-28 py-1 rounded font-medium text-white mx-auto">Sign In</button>
				</form>
			</div>
			
		</div>
	)
}

export default SignIn
