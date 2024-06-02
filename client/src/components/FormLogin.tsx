import { useState } from 'react';
import { bgColorDefault, bgColorDisable } from '../utils/constants';
import { fetchLogin } from '../api/fetchLogin';
import LoadingSpinner from './LoadingSpinner';
import { useNavigate } from 'react-router-dom';

export default function FormLogin(): JSX.Element {
	const navigate = useNavigate();
	const [showLoading, setShowLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		try {
			setShowLoading(true);

			const resp = await fetchLogin(formData);

			if (
				resp?.data?.user.role === 'admin' &&
				resp.data.message === 'Login successful'
			) {
				navigate('/dashboard-admin');
			} else if (
				resp?.data?.user.role !== 'admin' &&
				resp.data.message === 'Login successful'
			) {
				navigate('/reserved');
			}

			setShowLoading(false);
		} catch (error) {
			console.log(error);
			setShowLoading(false);
		}
	};

	return (
		<div className="w-11/12 mt-20 rounded-3xl py-10 box-shadow border border-slate-100">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col items-center space-y-2"
			>
				<div className=" flex flex-col space-y-1 w-4/5">
					<div>
						<label className="font-semibold text-gray-500">Email</label>
					</div>
					<div className="w-full">
						<input
							type="email"
							name="email"
							className="p-2 border-2 border-gray-300 rounded-lg w-full"
							value={formData.email}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className=" flex flex-col space-y-1 w-4/5">
					<div>
						<label className="font-semibold text-gray-500">Password</label>
					</div>
					<div className="w-full">
						<input
							type="password"
							name="password"
							className="p-2 border-2 border-gray-300 rounded-lg w-full"
							value={formData.password}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="w-4/5 pt-10">
					<button
						type="submit"
						className={`p-3 rounded-3xl ${
							showLoading ? bgColorDisable : bgColorDefault
						} w-full text-white font-semibold`}
						disabled={!showLoading ? false : true}
					>
						<div className="flex flex-row justify-center">
							{!showLoading ? 'Login' : <LoadingSpinner />}
						</div>
					</button>
				</div>
			</form>
		</div>
	);
}
