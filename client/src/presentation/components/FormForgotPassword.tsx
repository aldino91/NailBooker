import { ChangeEvent, useState } from 'react';
import { bgColorDefault, bgColorDisable } from '../../utils/constants';
import LoadingSpinner from './LoadingSpinner';
import InputCustom from './InputCustom';

export default function FormForgotPassword() {
	const [showLoading, setShowLoading] = useState(false);

	const [formData, setFormData] = useState({
		email: '',
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
				className="flex flex-col items-center space-y-4"
			>
				<InputCustom
					type="email"
					formData={formData}
					handleChange={handleChange}
					name="email"
				/>
				<div className="w-4/5 pt-10 ">
					<button
						type="submit"
						className={`p-3 rounded-3xl ${
							showLoading ? bgColorDisable : bgColorDefault
						} w-full text-white font-semibold`}
						disabled={!showLoading ? false : true}
					>
						<div className="flex flex-row justify-center">
							{!showLoading ? 'Submit' : <LoadingSpinner />}
						</div>
					</button>
				</div>
			</form>
		</div>
	);
}
