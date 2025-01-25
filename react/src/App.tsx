import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

export default function App() {
	const { isAuthenticated, isLoading } = useAuth0()
	console.log('🚀 ~ isAuthenticated:', isAuthenticated)

	if (isLoading) {
		return (
			<div
				style={{
					alignItems: 'center',
					display: 'flex',
					height: '100vh',
					justifyContent: 'center',
				}}
			>
				Loading...
			</div>
		)
	}

	return (
		<Router>
			<Routes>
				<Route path="/" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
				<Route path="/dashboard" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
			</Routes>
		</Router>
	)
}

const LoginPage = () => {
	const { loginWithRedirect } = useAuth0()
	return (
		<div
			style={{
				alignItems: 'center',
				display: 'flex',
				height: '100vh',
				justifyContent: 'center',
			}}
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
				onClick={() =>
					loginWithRedirect({
						authorizationParams: { organization: import.meta.env.VITE_SUPABASE_AUTH0_ORGANIZATION },
					})
				}
			>
				Log In
			</button>
		</div>
	)
}

const Home = () => {
	const { logout } = useAuth0()
	return (
		<div
			style={{
				textAlign: 'center',
				padding: '20px',
			}}
		>
			<h1>Welcome to the Dashboard!</h1>
			<button
				style={{
					backgroundColor: '#dc3545',
					border: 'none',
					borderRadius: '5px',
					color: 'white',
					cursor: 'pointer',
					padding: '10px 20px',
					marginTop: '20px',
				}}
				onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
			>
				Log Out
			</button>
		</div>
	)
}
