import './App.css';
import { Route, Routes } from 'react-router-dom';
import DashboardAdmin from './presentation/pages/DashboardAdmin';
import { Home } from './presentation/pages/Home';
import Booking from './presentation/pages/Booking';
import Register from './presentation/pages/Register';
import Login from './presentation/pages/Login';
import Reserved from './presentation/pages/Reserved';
import Calendar from './presentation/pages/Calendar';
import { ToastContainer } from 'react-toastify';
import { styleToast } from './utils/constants';
import ForgotPassword from './presentation/pages/ForgotPassword';
import ResetPassword from './presentation/pages/ResetPassword';
import EditBook from './presentation/pages/EditBook';

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
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/reset-password/:id" element={<ResetPassword />} />
				<Route path="/edit-book" element={<EditBook />} />
				<Route path="/dashboard-admin" element={<DashboardAdmin />} />
			</Routes>
			<ToastContainer
				autoClose={5000}
				closeButton={true}
				position="top-right"
				style={styleToast}
			/>
		</div>
	);
}

export default App;
