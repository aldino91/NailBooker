import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import Booking from './pages/Booking';
import Register from './pages/Register';
import Login from './pages/Login';
import Reserved from './pages/Reserved';
import Calendar from './pages/Calendar';
import DashboardAdmin from './pages/DashboardAdmin';

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/booking" element={<Booking />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/reserved" element={<Reserved />} />
				<Route path="/calendar" element={<Calendar />} />
				<Route path="/dashboard-admin" element={<DashboardAdmin />} />
			</Routes>
		</div>
	);
}

export default App;
