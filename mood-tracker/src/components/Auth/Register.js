// src/components/Auth/Register.js
import React, { useState } from 'react'
import AuthForm from './AuthForm'
import axios from 'axios'

const Register = () => {
	const API_URL = process.env.REACT_APP_BACKEND_API_URL

	const [formData, setFormData] = useState({
		name: '',
		password: '',
		confirmPassword: '',
		email: '',
	})
	const [error, setError] = useState('')

	const handleRegister = async (e) => {
		e.preventDefault()
		if (formData.password !== formData.confirmPassword) {
			setError('Passwords do not match.')
			return
		}
		try {
			const response = await axios.post(API_URL + '/register', formData)
			window.location.href = '/login'
		} catch (err) {
			setError('Registration failed. Please try again.')
		}
	}

	return (
		<div>
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
