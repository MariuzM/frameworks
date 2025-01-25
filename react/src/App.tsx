import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

export default function App() {
	const { isAuthenticated, isLoading } = useAuth0()

	if (isLoading) {
		return (
			<div
				style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center' }}
			>
				Loading...
			</div>
		)
	}

	return (
		<Router>
			<div style={{ fontFamily: 'Arial, sans-serif' }}>
				<Navbar />
				{isAuthenticated ? (
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
				) : (
					<LoginButton />
				)}
			</div>
		</Router>
	)
}

const Navbar = () => {
	const { isAuthenticated } = useAuth0()

	return (
		<nav
			style={{
				backgroundColor: '#f8f9fa',
				display: 'flex',
				justifyContent: 'space-between',
				padding: '15px',
			}}
		>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<a href="#" style={{ color: '#333', fontWeight: 'bold', textDecoration: 'none' }}>
					Authentication App
				</a>

				<div style={{ marginLeft: '20px' }}>
					<ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
						{isAuthenticated && (
							<a href="#" style={{ color: '#007bff', marginRight: '10px', textDecoration: 'none' }}>
								Home
							</a>
						)}
					</ul>
					{isAuthenticated && <LogoutButton />}
				</div>
			</div>
		</nav>
	)
}

const Home = () => {
	return <div style={{ textAlign: 'center', padding: '20px' }}>Home</div>
}

const LoginButton = () => {
	const { loginWithRedirect, isAuthenticated } = useAuth0()

	if (!isAuthenticated) {
		const handleLogin = () => {
			loginWithRedirect({
				authorizationParams: { organization: import.meta.env.VITE_SUPABASE_AUTH0_ORGANIZATION },
			})
		}

		return (
			<div
				style={{ alignItems: 'center', display: 'flex', height: '50vh', justifyContent: 'center' }}
			>
				<button
					style={{
						backgroundColor: '#007bff',
						border: 'none',
						borderRadius: '5px',
						color: 'white',
						cursor: 'pointer',
						padding: '10px 20px',
					}}
					onClick={handleLogin}
				>
					Log In
				</button>
			</div>
		)
	}
	return null
}

const LogoutButton = () => {
	const { logout, isAuthenticated } = useAuth0()

	if (isAuthenticated) {
		return (
			<>
				<button
					style={{
						backgroundColor: '#dc3545',
						border: 'none',
						borderRadius: '5px',
						color: 'white',
						cursor: 'pointer',
						padding: '8px 16px',
					}}
					onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
				>
					Log Out
				</button>
			</>
		)
	}

	return null
}
