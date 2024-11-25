import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../../css/MoodView.css'

const MoodView = () => {
	const [moods, setMoods] = useState([])
	const [error, setError] = useState('')
	const [editingId, setEditingId] = useState(null)
	const [editData, setEditData] = useState({
		mood: '',
		intensity: '',
		note: '',
	})
	const [selectedMoods, setSelectedMoods] = useState([])
	const API_URL = 'http://localhost:3000/api/v1/mood/'

	useEffect(() => {
		const fetchMoods = async () => {
			try {
				const { data } = await axios.get(API_URL, {
					withCredentials: true,
				})
				setMoods(data.moods.reverse())
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

	const deleteSelectedMoods = async () => {
		try {
			await axios.post(
				API_URL + 'delete-multiple',
				{ ids: selectedMoods },
				{
					withCredentials: true,
				}
			)
			setMoods((prevMoods) =>
				prevMoods.filter((mood) => !selectedMoods.includes(mood._id))
			)
			setSelectedMoods([])
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

	const validateEditData = () => {
		const { intensity, note } = editData
		if (intensity < 1 || intensity > 10) {
			setError('Intensity must be between 1 and 10')
			return false
		}
		if (note.length > 500) {
			setError('Note must be 500 characters or less')
			return false
		}
		return true
	}

	const saveMood = async (id) => {
		if (!validateEditData()) {
			return
		}
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

	const handleCheckboxChange = (id) => {
		setSelectedMoods((prevSelected) =>
			prevSelected.includes(id)
				? prevSelected.filter((moodId) => moodId !== id)
				: [...prevSelected, id]
		)
	}

	return (
		<div className='mood-view'>
			<h1>Mood Tracker</h1>
			<div className='delete-selected-button'>
				<button className='' onClick={deleteSelectedMoods}>
					Delete Selected
				</button>
			</div>
			{error && <div className='error'>{error}</div>}
			{moods.length === 0 ? (
				<div>No moods to display</div>
			) : (
				<>
					<ul>
						{moods.map((mood) => (
							<li key={mood._id}>
								<input
									className='select-checkbox'
									type='checkbox'
									checked={selectedMoods.includes(mood._id)}
									onChange={() =>
										handleCheckboxChange(mood._id)
									}
								/>
								<div>
									<strong>Mood:</strong> {mood.mood}
								</div>
								<div>
									<strong>Intensity:</strong> {mood.intensity}
								</div>
								<div>
									<strong>Timestamp:</strong>{' '}
									{new Date(mood.createdAt).toLocaleString()}
								</div>
								<div>
									<strong>Note:</strong> {mood.note}
								</div>
								{editingId === mood._id ? (
									<div>
										<select
											type='text'
											placeholder='Mood'
											value={editData.mood}
											onChange={(e) =>
												setEditData({
													...editData,
													mood: e.target.value,
												})
											}>
											<option value=''>
												Select Mood
											</option>
											<option value='happy'>Happy</option>
											<option value='sad'>Sad</option>
											<option value='angry'>Angry</option>
											<option value='relaxed'>
												Relaxed
											</option>
											<option value='stressed'>
												Stressed
											</option>
										</select>
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
										<textarea
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
										<div className='Edit-Buttons'>
											<button
												onClick={() =>
													saveMood(mood._id)
												}>
												Save
											</button>
											<button
												onClick={() =>
													setEditingId(null)
												}>
												Cancel
											</button>
										</div>
									</div>
								) : (
									<div>
										<button
											onClick={() => startEditing(mood)}>
											Edit
										</button>
										<button
											onClick={() =>
												deleteMood(mood._id)
											}>
											Delete
										</button>
									</div>
								)}
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	)
}

export default MoodView
