// src/components/Auth/Login.js
import React, { useState } from 'react'
import AuthForm from './AuthForm'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api/v1/'
const Login = () => {
	const [formData, setFormData] = useState({ username: '', password: '' })
	const [error, setError] = useState('')
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const handleLogin = async (e) => {
		e.preventDefault()
		try {
			const response = await axios.post(API_URL + 'login', formData) // Replace with your actual API route
			console.log('Login successful:', response.data)
			setIsLoggedIn(true)
			// Redirect user or save token, etc.
		} catch (err) {
			setError('Login failed. Check your credentials.')
		}
	}

	const handleLogout = async () => {
		try {
			const response = await axios.post(API_URL + 'logout') // Replace with your actual API route
			console.log('Logout successful:', response.data)
			setIsLoggedIn(false)
			// Redirect user or clear token, etc.
		} catch (err) {
			setError('Logout failed. Please try again.')
		}
	}

	return (
		<div>
			{isLoggedIn ? (
				<button onClick={handleLogout}>Logout</button>
			) : (
				<>
					<h2>Login</h2>
					<AuthForm
						onSubmit={handleLogin}
						isRegister={false}
						setFormData={setFormData}
						formData={formData}
						error={error}
					/>
				</>
			)}
		</div>
	)
}

export default Login
