import { ChangeEvent, useState } from 'react';
import InputCustom from './InputCustom';
import { bgColorDefault, bgColorDisable } from '../../utils/constants';
import LoadingSpinner from './LoadingSpinner';
import useToast from '../../hook/HookToast';
import { useParams } from 'react-router-dom';
import { fetchResetPassword } from '../../api/fetchResetPassword';

export default function FormResetPassword() {
	const { id } = useParams();

	const [showLoading, setShowLoading] = useState(false);

	const { notify } = useToast();

	const [formData, setFormData] = useState({
		password: '',
		confirm: '',
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

		if (formData.password === formData.confirm) {
			try {
				setShowLoading(true);

				const { data, status } = await fetchResetPassword({
					id: id!,
					confirm: formData.confirm,
				});

				setFormData({
					password: '',
					confirm: '',
				});

				notify(data, status);

				setShowLoading(false);
			} catch (error) {
				console.log(error);
				notify(
					'Abbiamo problemi al server per aggiornare la password, provi piú tardi. Grazie.',
					'error'
				);
				setShowLoading(false);
			}
		} else {
			notify(`Le password non coicidono, provi un'altra volta`, 'warn');
			console.log('Sono diversi...');
		}
	};
	return (
		<div className="w-11/12 mt-20 rounded-3xl py-10 box-shadow border border-slate-100">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col items-center space-y-4"
			>
				<InputCustom
					type="password"
					formData={formData}
					handleChange={handleChange}
					name="password"
				/>
				<InputCustom
					type="password"
					formData={formData}
					handleChange={handleChange}
					name="confirm"
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
							{!showLoading ? 'Reset' : <LoadingSpinner />}
						</div>
					</button>
				</div>
			</form>
		</div>
	);
}
