import React, { useState } from 'react'
import MoodForm from '../Mood/MoodForm'

const Dashboard = () => {
	const [showForm, setShowForm] = useState(false)

	return (
		<div>
			<h1>Welcome to the Daily Mood Tracker App</h1>
			<button onClick={() => setShowForm(!showForm)}>
				{showForm ? 'Hide Form' : 'Show Form'}
			</button>
			{showForm && <MoodForm />}
		</div>
	)
}

export default Dashboard
