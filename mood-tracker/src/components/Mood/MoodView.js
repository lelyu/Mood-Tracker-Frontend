import React, { useState, useEffect } from 'react'
import axios from 'axios'

const MoodView = () => {
	const [moods, setMoods] = useState([])
	const [error, setError] = useState('')
	const [editingId, setEditingId] = useState(null)
	const [editData, setEditData] = useState({
		mood: '',
		intensity: '',
		note: '',
	})
	const API_URL = 'http://localhost:3000/api/v1/mood/'

	useEffect(() => {
		const fetchMoods = async () => {
			try {
				const { data } = await axios.get(API_URL, {
					withCredentials: true,
				})
				setMoods(data.moods)
				setError('')
			} catch (err) {
				setError(err.response?.data?.error || 'An error occurred')
			}
		}
		fetchMoods()
	}, [])

	const deleteMood = async (id) => {
		try {
			await axios.delete(API_URL + id, {
				withCredentials: true,
			})
			setMoods((prevMoods) => prevMoods.filter((mood) => mood._id !== id))
			setError('')
		} catch (err) {
			setError(err.response?.data?.error || 'An error occurred')
		}
	}

	const startEditing = (mood) => {
		setEditingId(mood._id)
		setEditData({
			mood: mood.mood,
			intensity: mood.intensity,
			note: mood.note,
		})
	}

	const saveMood = async (id) => {
		try {
			await axios.patch(
				API_URL + id,
				{ ...editData },
				{
					withCredentials: true,
				}
			)
			setMoods((prevMoods) =>
				prevMoods.map((prevMood) =>
					prevMood._id === id
						? { ...prevMood, ...editData }
						: prevMood
				)
			)
			setEditingId(null)
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
							<div>
								<strong>Mood:</strong> {mood.mood}
							</div>
							<div>
								<strong>Intensity:</strong> {mood.intensity}
							</div>
							<div>
								<strong>Note:</strong> {mood.note}
							</div>
							<div>
								<strong>Timestamp:</strong>{' '}
								{new Date(mood.createdAt).toLocaleString()}
							</div>

							{editingId === mood._id ? (
								<div>
									<input
										type='text'
										placeholder='Mood'
										value={editData.mood}
										onChange={(e) =>
											setEditData({
												...editData,
												mood: e.target.value,
											})
										}
									/>
									<input
										type='text'
										placeholder='Intensity'
										value={editData.intensity}
										onChange={(e) =>
											setEditData({
												...editData,
												intensity: e.target.value,
											})
										}
									/>
									<input
										type='text'
										placeholder='Note'
										value={editData.note}
										onChange={(e) =>
											setEditData({
												...editData,
												note: e.target.value,
											})
										}
									/>
									<button onClick={() => saveMood(mood._id)}>
										Save
									</button>
									<button onClick={() => setEditingId(null)}>
										Cancel
									</button>
								</div>
							) : (
								<div>
									<button onClick={() => startEditing(mood)}>
										Edit
									</button>
									<button
										onClick={() => deleteMood(mood._id)}>
										Delete
									</button>
								</div>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default MoodView
