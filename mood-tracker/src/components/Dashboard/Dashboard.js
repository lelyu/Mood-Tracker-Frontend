import React, { useState, useEffect } from 'react'
import MoodForm from '../Mood/MoodForm'
import axios from 'axios'
import HeatMap from './HeatMap'
import * as d3 from 'd3'
import '../../css/Dashboard.css'
const Dashboard = () => {
	const [showForm, setShowForm] = useState(false)
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true) // New state for loading indicator
	const API_URL = 'http://localhost:3000/api/v1/'

	useEffect(() => {
		// Load data from CSV with async/await
		const fetchData = async () => {
			try {
				const loadedData = await d3.csv(
					'https://raw.githubusercontent.com/lelyu/Mood-Tracker-Frontend/refs/heads/main/mood-tracker/mockData.csv'
				)
				console.log('Loaded data:', loadedData)
				const formattedData = loadedData.map((d) => ({
					Month: d.Month,
					Date: d.Date,
					value: +d.Date,
				}))
				setData(formattedData)
			} catch (error) {
				console.error('Error loading the data:', error)
			} finally {
				setLoading(false) // Turn off loading when done
			}
		}
		fetchData()
	}, [])

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
		<div className='dashboard'>
			<h1>How are you feeling today?</h1>
			<div>
				<p>
					Maintaining a daily journal has been shown to significantly
					enhance mental well-being by fostering self-awareness and
					emotional regulation. The Daily Mood Tracker app is designed
					to encourage this beneficial habit, providing users with an
					intuitive platform to log their emotions and experiences
					effortlessly. By offering insightful data visualizations,
					such as heat maps that highlight mood patterns over time,
					the app empowers individuals to identify emotional trends
					and triggers, promoting proactive mental health management.
				</p>
			</div>
			<MoodForm className='mood-form' />
			{/* <button onClick={testAuthAPICalls}>Test Auth API Calls</button> */}
			{/* Show loading indicator or HeatMap */}
			{loading ? (
				<div>Loading data...</div> // Loading indicator
			) : (
				<HeatMap data={data} />
			)}
		</div>
	)
}

export default Dashboard
