// src/components/Auth/Login.js
import React, { useState } from 'react'
import AuthForm from './AuthForm'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api/v1/auth/'
const Login = () => {
	const [formData, setFormData] = useState({ username: '', password: '' })
	const [error, setError] = useState('')

	const handleLogin = async (e) => {
		e.preventDefault()
		try {
			const response = await axios.post(API_URL + 'login', formData) // Replace with your actual API route
			console.log('Login successful:', response.data)
			// Redirect user or save token, etc.
		} catch (err) {
			setError('Login failed. Check your credentials.')
		}
	}

	return (
		<div>
			<h2>Login</h2>
			<AuthForm
				onSubmit={handleLogin}
				isRegister={false}
				setFormData={setFormData}
				formData={formData}
				error={error}
			/>
		</div>
	)
}

export default Login
