import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRegister } from '../../api/fetchRegister';
import { bgColorDefault, bgColorDisable } from '../../utils/constants';
import LoadingSpinner from './LoadingSpinner';
import InputCustom from './InputCustom';

export default function FormRegister(): JSX.Element {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(true);

	const [showLoading, setShowLoading] = useState(false);

	const [formData, setFormData] = useState({
		name: '',
		surname: '',
		phoneNumber: '',
		email: '',
		password: '',
		emailValidated: false,
		role: 'admin',
	});

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

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

			const response = await fetchRegister(formData);

			console.log(response.user);

			setShowLoading(false);

			setFormData({
				name: '',
				surname: '',
				phoneNumber: '',
				email: '',
				password: '',
				emailValidated: false,
				role: 'admin',
			});

			navigate(`/login`);
			return true;
		} catch (error) {
			console.log(error);
			setShowLoading(false);

			return false;
		}
	};

	return (
		<div className="w-11/12 mt-20 rounded-3xl py-10 box-shadow border border-slate-100">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col items-center space-y-2"
			>
				<InputCustom
					type="text"
					formData={formData}
					handleChange={handleChange}
					name="name"
				/>
				<InputCustom
					type="text"
					formData={formData}
					handleChange={handleChange}
					name="surname"
				/>

				<InputCustom
					type="text"
					formData={formData}
					handleChange={handleChange}
					name="phoneNumber"
				/>

				<InputCustom
					type="email"
					formData={formData}
					handleChange={handleChange}
					name="email"
				/>
				<InputCustom
					type="password"
					formData={formData}
					handleChange={handleChange}
					name="password"
					showPassword={showPassword}
					handleShowPassword={handleShowPassword}
				/>
				<div className="w-4/5 pt-10 flex flex-row justify-between">
					<button
						type="submit"
						className={`p-3 rounded-3xl ${
							showLoading ? bgColorDisable : bgColorDefault
						}
						  w-1/3 text-white font-semibold`}
						disabled={!showLoading ? false : true}
					>
						<div className="flex flex-row justify-center">
							{!showLoading ? 'Invio' : <LoadingSpinner />}
						</div>
					</button>
					<button
						onClick={() => navigate('/login')}
						className="font-semibold text-gray-500 w-1/3 p-3 rounded-3xl border border-gray-400"
					>
						Login
					</button>
				</div>
			</form>
		</div>
	);
}
