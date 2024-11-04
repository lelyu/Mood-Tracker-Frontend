import React, { useState } from 'react'
import MoodForm from '../Mood/MoodForm'

const Dashboard = () => {
	const [showForm, setShowForm] = useState(false)

	return (
		<div>
			<h1>How are you feeling today?</h1>
			<MoodForm />
		</div>
	)
}

export default Dashboard
