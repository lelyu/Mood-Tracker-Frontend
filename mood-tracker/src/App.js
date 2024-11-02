// src/App.js
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import MoodForm from './components/Mood/MoodForm'
import MoodView from './components/Mood/MoodView'
import './css/Nav.css'
import Dashboard from './components/Dashboard/Dashboard'

const App = () => (
	<Router>
		<nav className='navbar'>
			<Link to='/'>Mood Tracker App</Link>
			<Link to='/login'>Login</Link>
			<Link to='/register'>Register</Link>
		</nav>
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
			<Route path='/' element={<Dashboard />} />
			<Route path='/mood' element={<MoodView />} />
		</Routes>
	</Router>
)

export default App
