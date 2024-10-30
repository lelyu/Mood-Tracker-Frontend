// src/components/Auth/AuthForm.js
import React from 'react'

const AuthForm = ({ onSubmit, isRegister, setFormData, formData, error }) => (
	<form onSubmit={onSubmit}>
		<div>
			<label>Username:</label>
			<input
				type='text'
				value={formData.username}
				onChange={(e) =>
					setFormData({ ...formData, username: e.target.value })
				}
				required
			/>
		</div>
		<div>
			<label>Password:</label>
			<input
				type='password'
				value={formData.password}
				onChange={(e) =>
					setFormData({ ...formData, password: e.target.value })
				}
				required
			/>
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
		<button type='submit'>{isRegister ? 'Register' : 'Login'}</button>
	</form>
)

export default AuthForm
