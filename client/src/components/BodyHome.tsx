import { useNavigate } from 'react-router-dom';
import { bgColorDefault } from '../utils/constants';

export default function BodyHome(): JSX.Element {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col px-3 py-5 overflow-scroll h-4/5">
			<div className="w-full">
				<h3 className="text-2xl font-bold text-gray-500">Featured services</h3>
			</div>

			{listService.map((service, index) => {
				return (
					<div className="flex flex-col space-y-2 px-2" key={index}>
						<div
							id={service}
							className="w-full h-44 rounded-3xl box-shadow"
						></div>

						<div className="">
							<text className="font-semibold capitalize text-gray-500">
								{service}
							</text>
						</div>
					</div>
				);
			})}

			<div
				className={`w-14 h-14 rounded-full  ${bgColorDefault}  opacity-70  fixed bottom-10 left-5 flex flex-row justify-center items-center cursor-pointer`}
				onClick={() => {
					navigate('/reserved');
				}}
			>
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-7 h-7"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
						/>
					</svg>
				</div>
			</div>

			<div
				className="w-14 h-14 rounded-full  bg-stone-400 opacity-70 fixed bottom-10 right-5 flex flex-row justify-center items-center cursor-pointer"
				// onClick={() => {
				// 	navigate('https://wa.me/34644102488');
				// }}
			>
				{/* <a href="https://wa.me/393200313778">
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="30"
							height="30"
							viewBox="0 0 24 24"
							// style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112s-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263"
							></path>
						</svg>
					</div>
				</a> */}
				<div
					className=""
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
		</div>
	);
}

const listService = [
	'classic-manicure',
	'pedicure',
	'semi-permanente',
	'permanente',
	'manicura-pedicura-francesa',
	'uñas-acrílicas-gel',
	'remoción-esmalte-postizas',
];
