import React, { createContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [user, setUser] = useState(null)

	useEffect(() => {
		// Check login status on component mount
		const checkLoginStatus = async () => {
			try {
				const response = await fetch('/api/auth/isLoggedIn', {
					method: 'GET',
					credentials: 'include', // Include HttpOnly cookie
				})

				if (response.ok) {
					const data = await response.json()
					setIsLoggedIn(data.isLoggedIn)
					setUser(data.user)
				} else {
					setIsLoggedIn(false)
					setUser(null)
				}
			} catch (error) {
				console.error('Error checking login status:', error)
				setIsLoggedIn(false)
				setUser(null)
			}
		}

		checkLoginStatus()
	}, [])

	return (
		<AuthContext.Provider
			value={{ isLoggedIn, user, setIsLoggedIn, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => React.useContext(AuthContext)
