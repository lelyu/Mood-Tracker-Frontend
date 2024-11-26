import React from 'react'
import '../../css/AuthForm.css'
import { Link } from 'react-router-dom'
const AuthForm = ({ onSubmit, isRegister, setFormData, formData, error }) => {
	const [passwordError, setPasswordError] = React.useState('')
	const [nameError, setNameError] = React.useState('')
	const handlePasswordChange = (e) => {
		const password = e.target.value
		setFormData({ ...formData, password })

		if (isRegister) {
			const strongPasswordRegex =
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
			if (!strongPasswordRegex.test(password)) {
				setPasswordError(
					'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
				)
			} else {
				setPasswordError('')
			}
		}
	}

	const handleEmailChange = (e) => {
		const email = e.target.value
		setFormData({ ...formData, email })

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(email)) {
			setEmailError('Please enter a valid email address.')
		} else {
			setEmailError('')
		}
	}

	const [emailError, setEmailError] = React.useState('')

	return (
		<form className='auth-form' onSubmit={onSubmit}>
			{isRegister && (
				<div>
					<label>Username:</label>
					<input
						type='text'
						value={formData.name}
						onChange={(e) => {
							const name = e.target.value
							setFormData({ ...formData, name })
							if (name.length < 3 || name.length > 50) {
								setNameError(
									'Username must be between 3 and 50 characters.'
								)
							} else {
								setNameError('')
							}
						}}
						required
						placeholder='enter 3 to 50 characters'
					/>
					{nameError && <p style={{ color: 'red' }}>{nameError}</p>}
				</div>
			)}
			<div>
				<label>Email:</label>
				<input
					type='text'
					value={formData.email}
					onChange={handleEmailChange}
					required
					placeholder='enter a valid email'
				/>
				{emailError && <p style={{ color: 'red' }}>{emailError}</p>}
			</div>
			<div>
				<label>Password:</label>
				<input
					type='password'
					value={formData.password}
					onChange={handlePasswordChange}
					required
				/>
				{passwordError && (
					<p style={{ color: 'red' }}>{passwordError}</p>
				)}
			</div>
			{isRegister && (
				<div>
					<label>Confirm Password:</label>
					<input
						type='password'
						value={formData.confirmPassword}
						onChange={(e) =>
							setFormData({
								...formData,
								confirmPassword: e.target.value,
							})
						}
						required
					/>
				</div>
			)}
			{error && <p style={{ color: 'red' }}>{error}</p>}
			{!isRegister && (
				<Link to='/register'>Not a user? Register here</Link>
			)}
			<button type='submit'>{isRegister ? 'Register' : 'Login'}</button>
		</form>
	)
}

export default AuthForm
