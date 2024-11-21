import React from 'react'
import '../../css/AuthForm.css'
import { Link } from 'react-router-dom'
const AuthForm = ({ onSubmit, isRegister, setFormData, formData, error }) => (
	<form className='auth-form' onSubmit={onSubmit}>
		{isRegister && (
			<div>
				<label>Username:</label>
				<input
					type='text'
					value={formData.name}
					onChange={(e) =>
						setFormData({ ...formData, name: e.target.value })
					}
					required
				/>
			</div>
		)}
		<div>
			<label>Email:</label>
			<input
				type='text'
				value={formData.email}
				onChange={(e) =>
					setFormData({ ...formData, email: e.target.value })
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
		{!isRegister && <Link to='/register'>Not a user? Register here</Link>}
		<button type='submit'>{isRegister ? 'Register' : 'Login'}</button>
	</form>
)

export default AuthForm
