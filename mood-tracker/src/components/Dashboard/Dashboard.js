import React, { useState, useEffect } from 'react'
import MoodForm from '../Mood/MoodForm'
import axios from 'axios'
import HeatMap from './HeatMap'
import * as d3 from 'd3'
import '../../css/Dashboard.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../Auth/AuthContext'

const Dashboard = () => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [username, setUsername] = useState('')
	const API_URL = process.env.REACT_APP_BACKEND_API_URL

	// call isLoggedIn API from backend to check whether the user is logged in or not
	useEffect(() => {
		const checkLoggedIn = async () => {
			try {
				const response = await axios.get(API_URL + '/isloggedin', {
					withCredentials: true,
				})
				setUsername(response.data.user.name)
				setIsLoggedIn(response.data.isLoggedIn)
			} catch (err) {}
		}
		checkLoggedIn()
	}, [])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get(API_URL + '/mood/', {
					withCredentials: true,
				})
				const formattedData = data.moods.map(function (d) {
					const timeCreated = d.createdAt
					const date = new Date(timeCreated)
					const month = date.getMonth() + 1
					const day = date.getDate()

					const count = data.moods.filter((mood) => {
						const moodDate = new Date(mood.createdAt)
						return (
							moodDate.getDate() === day &&
							moodDate.getMonth() + 1 === month
						)
					}).length

					return {
						Date: day,
						Month: month,
						Mood: d.mood,
						Intensity: d.intensity,
						Count: count,
						Year: date.getFullYear(),
					}
				})
				setData(formattedData)
			} catch (error) {
			} finally {
				setLoading(false) // Turn off loading when done
			}
		}
		fetchData()
	}, [])

	return (
		<div className='dashboard'>
			<h1>How are you feeling today?</h1>
			<div>
				{isLoggedIn && <h2>Hello, {username}</h2>}
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
			{isLoggedIn && <MoodForm className='mood-form' />}

			{isLoggedIn ? (
				<HeatMap className='heat-map' data={data} />
			) : (
				<Link to='/login'>Login to start</Link>
			)}
		</div>
	)
}

export default Dashboard
