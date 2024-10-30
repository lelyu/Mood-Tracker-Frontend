// src/App.js
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'

const App = () => (
	<Router>
		<nav>
			<Link to='/login'>Login</Link>
			<Link to='/register'>Register</Link>
		</nav>
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
			<Route path='/' element={<h1>Welcome to Mood Tracker App</h1>} />
		</Routes>
	</Router>
)

export default App
