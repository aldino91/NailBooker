import { useState } from 'react';
import { bgColorDefault } from '../utils/constants';

export default function FormLogin(): JSX.Element {
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
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

	const handleSubmit = (e: any) => {
		e.preventDefault();

		console.log(formData);
	};

	return (
		<div className="w-11/12 mt-20 rounded-3xl py-10 box-shadow border border-slate-100">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col items-center space-y-2"
			>
				<div className=" flex flex-col space-y-1 w-4/5">
					<div>
						<label className="font-semibold text-gray-500">Email:</label>
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
						<label className="font-semibold text-gray-500">Password:</label>
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
						className={`p-3 rounded-3xl ${bgColorDefault} w-full text-white font-semibold`}
					>
						Login
					</button>
				</div>
			</form>
		</div>
	);
}
