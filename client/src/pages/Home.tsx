import { useNavigate } from 'react-router-dom';
import BaseLayout from '../presentation/components/BaseLayout';
import BodyHome from '../components/BodyHome';

export function Home(): JSX.Element {
	const navigate = useNavigate();

	return (
		<BaseLayout>
			<div
				id="background-photo"
				className="w-full h-60 flex flex-row items-center justify-center rounded-b-3xl relative"
			>
				<div className="">
					<h3 className="text-2xl lg:text-6xl font-semibold">
						Benvenuti a GB NAILS
					</h3>
				</div>
				<div
					className="absolute top-5 right-10 border-2 border-black rounded-full cursor-pointer"
					onClick={() => {
						navigate('/login');
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						// style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
					>
						<path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
					</svg>
				</div>
			</div>
			<BodyHome />
		</BaseLayout>
	);
}
