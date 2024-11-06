import React, { useState } from 'react'
import axios from 'axios'

const MoodForm = () => {
	const [mood, setMood] = useState('')
	const [intensity, setIntensity] = useState(1)
	const [note, setNote] = useState('')
	const [error, setError] = useState('')
	const API_URL = 'http://localhost:3000/api/v1/mood/'

	const onSubmit = async (e) => {
		e.preventDefault() // prevent page refresh
		try {
			await axios.post(
				API_URL,
				{ mood, intensity, note },
				{
					withCredentials: true,
				}
			)
			setMood('')
			setIntensity(1)
			setNote('')
			setError('')
		} catch (err) {
			setError(err.response?.data?.error || 'An error occurred')
		}
	}

	return (
		<form onSubmit={onSubmit}>
			<div>
				<label>Mood:</label>
				<select
					value={mood}
					onChange={(e) => setMood(e.target.value)}
					required>
					<option value=''>Select Mood</option>
					<option value='happy'>Happy</option>
					<option value='sad'>Sad</option>
					<option value='angry'>Angry</option>
					<option value='stressed'>Stressed</option>
					<option value='relaxed'>Relaxed</option>
				</select>
			</div>

			<div>
				<label>Intensity (1-10):</label>
				<input
					type='number'
					min='1'
					max='10'
					value={intensity}
					onChange={(e) => setIntensity(e.target.value)}
					required
				/>
			</div>

			<div>
				<label>Note (Optional):</label>
				<input
					type='text'
					maxLength='100'
					value={note}
					onChange={(e) => setNote(e.target.value)}
				/>
			</div>

			{error && <p style={{ color: 'red' }}>{error}</p>}

			<button type='submit'>Submit</button>
		</form>
	)
}

export default MoodForm
