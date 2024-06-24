import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import IconShowPassword from './IconShowPassword';

interface Props {
	type: 'text' | 'password' | 'number' | 'email';
	name: string;
	formData: { [key: string]: any };
	showPassword?: boolean;
	pageNavigate?: string;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleShowPassword?: () => void;
}

export default function InputCustom({
	type,
	name,
	formData,
	showPassword,
	pageNavigate,
	handleChange,
	handleShowPassword,
}: Props) {
	const navigate = useNavigate();
	return (
		<div className=" flex flex-col space-y-1 w-4/5">
			<div className="flex flex-row justify-between">
				<label className="font-semibold text-gray-500 capitalize">{name}</label>
				{type === 'password' && pageNavigate ? (
					<button
						type="button"
						className="cursor-pointer"
						onClick={() => navigate(`/${pageNavigate}`)}
					>
						<text className="text-gray-500 underline">Forgot password?</text>
					</button>
				) : null}
			</div>
			<div className="w-full relative">
				<div>
					<input
						type={!showPassword ? 'text' : 'password'}
						name={name}
						className="p-2 border-2 border-gray-300 rounded-lg w-full"
						value={formData[name]}
						onChange={handleChange}
					/>
				</div>

				{type === 'password' && showPassword !== undefined ? (
					<button
						type="button"
						onClick={handleShowPassword}
						className="cursor-pointer absolute top-0 right-2 h-full"
					>
						<IconShowPassword showPassword={showPassword} />
					</button>
				) : null}
			</div>
		</div>
	);
}
