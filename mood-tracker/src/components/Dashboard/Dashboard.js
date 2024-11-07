import React, { useState, useEffect } from 'react'
import MoodForm from '../Mood/MoodForm'
import axios from 'axios'
import HeatMap from './HeatMap'
import * as d3 from 'd3'

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
					'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv'
				)
				const formattedData = loadedData.map((d) => ({
					group: d.group,
					variable: d.variable,
					value: +d.value,
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
		<div>
			<h1>How are you feeling today?</h1>
			<MoodForm />
			<button onClick={testAuthAPICalls}>Test Auth API Calls</button>
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
