import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLogin } from '../../api/fetchLogin';
import { bgColorDefault, bgColorDisable } from '../../utils/constants';
import LoadingSpinner from './LoadingSpinner';
import InputCustom from './InputCustom';
import useToast from '../../hook/HookToast';

export default function FormLogin(): JSX.Element {
	const navigate = useNavigate();

	const { notify } = useToast();

	const [showPassword, setShowPassword] = useState(true);

	const [showLoading, setShowLoading] = useState(false);

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		try {
			setShowLoading(true);

			const resp = await fetchLogin(formData);

			if (resp.data.error) {
				notify(resp.data.error, 'warn');
			} else {
				if (
					resp?.data?.user.role === 'admin' &&
					resp.data.message === 'Login successful'
				) {
					navigate('/dashboard-admin');
				}
				if (
					resp?.data?.user.role !== 'admin' &&
					resp.data.message === 'Login successful'
				) {
					navigate('/reserved');
				}
			}
			setShowLoading(false);
		} catch (error) {
			console.log('Error Login =>', error);
			notify('Error al logearse, intetelo mas tarde...', 'warn');
			setShowLoading(false);
		}
	};

	return (
		<div className="w-full flex flex-row justify-center">
			<div className="w-11/12 mt-20 rounded-3xl py-10 box-shadow bg-default">
				<form
					onSubmit={handleSubmit}
					className="flex flex-col items-center space-y-4"
				>
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
						pageNavigate="forgot-password"
						showPassword={showPassword}
						handleShowPassword={handleShowPassword}
					/>

					<div className="w-4/5 pt-10 flex flex-row justify-between">
						<button
							type="submit"
							className={`p-3 rounded-3xl ${
								showLoading ? bgColorDisable : bgColorDefault
							} w-1/3 text-white font-semibold`}
							disabled={!showLoading ? false : true}
						>
							<div className="flex flex-row justify-center">
								{!showLoading ? 'Login' : <LoadingSpinner />}
							</div>
						</button>
						<button
							onClick={() => navigate('/register')}
							className="font-semibold text-gray-500 w-1/3 p-3 rounded-3xl border border-gray-400 bg-white"
						>
							Register
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
