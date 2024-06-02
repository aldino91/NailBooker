import { useNavigate } from 'react-router-dom';
import { bgColorDefault } from '../utils/constants';

interface Props {
	href?: string;
	title: string;
}

export default function HeaderBar({ href, title }: Props): JSX.Element {
	const navigate = useNavigate();
	return (
		<div
			className={`w-full h-20 ${bgColorDefault} flex flex-row items-center rounded-b-3xl shadow-xl mb-8`}
		>
			<div
				className="w-1/12 cursor-pointer"
				onClick={() => {
					navigate(`/${href ? href : ''}`);
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					// style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
				>
					<path d="M15 19V5l-8 7z"></path>
				</svg>
			</div>
			<div className="w-10/12 text-center">
				<h1 className="text-white font-base text-3xl">{title}</h1>
			</div>
		</div>
	);
}
