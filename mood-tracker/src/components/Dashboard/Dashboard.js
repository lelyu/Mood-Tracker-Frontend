import React, { useState } from 'react'
import MoodForm from '../Mood/MoodForm'
import axios from 'axios'

const Dashboard = () => {
	const [showForm, setShowForm] = useState(false)
	const API_URL = 'http://localhost:3000/api/v1/'

	const testAuthAPICalls = async () => {
		try {
			console.log('Testing API calls...')
			const response = await axios.get(API_URL + 'dashboard', {
				withCredentials: true,
			})
			console.log('Test API call:', response.data)
		} catch (err) {
			console.error(
				'Test API call failed:',
				err.response?.data?.error || 'An error occurred'
			)
		}
	}

	return (
		<div>
			<h1>How are you feeling today?</h1>
			<MoodForm />
			<button onClick={testAuthAPICalls}>Test Auth API Calls</button>
		</div>
	)
}

export default Dashboard
