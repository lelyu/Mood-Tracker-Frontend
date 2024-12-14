// src/components/Auth/Login.js
import React, { useState } from 'react'
import AuthForm from './AuthForm'
import axios from 'axios'

const Login = () => {
	const API_URL = process.env.REACT_APP_BACKEND_API_URL

	const [formData, setFormData] = useState({ email: '', password: '' })
	const [error, setError] = useState('')
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const handleLogin = async (e) => {
		e.preventDefault()
		try {
			const response = await axios.post(API_URL + '/login', formData, {
				withCredentials: true,
			})
			setIsLoggedIn(true)
			window.location.href = '/'
		} catch (err) {
			setError('Login failed. Check your credentials.')
		}
	}

	const handleLogout = async () => {
		try {
			const response = await axios.post(
				API_URL + 'logout',
				{},
				{
					withCredentials: true,
				}
			) // Replace with your actual API route
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
