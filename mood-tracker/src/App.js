// src/App.js
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import MoodForm from './components/Mood/MoodForm'
import MoodView from './components/Mood/MoodView'
import './css/Nav.css'
import Dashboard from './components/Dashboard/Dashboard'
import axios from 'axios'

const App = () => {
	const API_URL = 'http://localhost:3000/api/v1/'
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [error, setError] = useState('')

	// call isLoggedIn API from backend to check whether the user is logged in or not
	useEffect(() => {
		const checkLoggedIn = async () => {
			try {
				const response = await axios.get(API_URL + 'isloggedin', {
					withCredentials: true,
				})
				setIsAuthenticated(response.data.isLoggedIn)
			} catch (err) {
				console.error(err)
			}
		}
		checkLoggedIn()
	}, [])

	const handleLogout = async () => {
		try {
			const response = await axios.post(
				API_URL + 'logout',
				{},
				{
					withCredentials: true,
				}
			)
			console.log('Logout successful:', response.data)
			setIsAuthenticated(false)
			window.location.href = '/login'
		} catch (err) {
			setError('Logout failed. Please try again.')
		}
	}

	return (
		<Router>
			<nav className='navbar'>
				<Link to='/'>Mood Tracker App</Link>
				{isAuthenticated && <Link to='/mood'>Mood History</Link>}
				{!isAuthenticated && <Link to='/register'>Register</Link>}
				{isAuthenticated && (
					<button onClick={handleLogout}>Logout</button>
				)}
				{!isAuthenticated && <Link to='/login'>Login</Link>}
			</nav>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/' element={<Dashboard />} />
				<Route path='/mood' element={<MoodView />} />
			</Routes>
		</Router>
	)
}
export default App
