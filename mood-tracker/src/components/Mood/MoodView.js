// get mood form to backend. calls the get API
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const MoodView = () => {
	const [moods, setMoods] = useState([])
	const [error, setError] = useState('')

	useEffect(() => {
		const fetchMoods = async () => {
			try {
				const { data } = await axios.get('/api/mood')
				setMoods(data)
				setError('')
			} catch (err) {
				setError(err.response?.data?.error || 'An error occurred')
			}
		}
		fetchMoods()
	}, [])

	const deleteMood = async (id) => {
		try {
			await axios.delete(`/api/mood/${id}`)
			setMoods((prevMoods) => prevMoods.filter((mood) => mood._id !== id))
			setError('')
		} catch (err) {
			setError(err.response?.data?.error || 'An error occurred')
		}
	}

	const updateMood = async (id, mood) => {
		try {
			await axios.put(`/api/mood/${id}`, { mood })
			setMoods((prevMoods) =>
				prevMoods.map((prevMood) =>
					prevMood._id === id ? { ...prevMood, mood } : prevMood
				)
			)
			setError('')
		} catch (err) {
			setError(err.response?.data?.error || 'An error occurred')
		}
	}

	return (
		<div>
			<h1>Mood Tracker</h1>
			{error && <div className='error'>{error}</div>}
			{moods.length === 0 ? (
				<div>No moods to display</div>
			) : (
				<ul>
					{moods.map((mood) => (
						<li key={mood._id}>
							<div>{mood.mood}</div>
							<div>{mood.intensity}</div>
							<div>{mood.note}</div>
							<button onClick={() => updateMood(mood._id)}>
								Update mood
							</button>
							<button onClick={() => deleteMood(mood._id)}>
								Delete mood
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default MoodView
