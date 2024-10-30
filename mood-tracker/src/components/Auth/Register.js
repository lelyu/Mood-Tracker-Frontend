// src/components/Auth/Register.js
import React, { useState } from 'react'
import AuthForm from './AuthForm'
import axios from 'axios'

const Register = () => {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
		confirmPassword: '',
	})
	const [error, setError] = useState('')

	const handleRegister = async (e) => {
		e.preventDefault()
		if (formData.password !== formData.confirmPassword) {
			setError('Passwords do not match.')
			return
		}
		try {
			const response = await axios.post('/api/register', formData) // Replace with your actual API route
			console.log('Registration successful:', response.data)
			// Redirect user or show success message
		} catch (err) {
			setError('Registration failed. Please try again.')
		}
	}

	return (
		<div>
			<h2>Register</h2>
			<AuthForm
				onSubmit={handleRegister}
				isRegister={true}
				setFormData={setFormData}
				formData={formData}
				error={error}
			/>
		</div>
	)
}

export default Register
