import { RotatingLines } from 'react-loader-spinner';

export default function LoadingSpinner(): JSX.Element {
	return (
		<div className="w-1/6 flex flex-row justify-center">
			<RotatingLines
				visible={true}
				width="23"
				strokeWidth="5"
				animationDuration="0.60"
				ariaLabel="rotating-lines-loading"
				strokeColor="rgb(226 232 240)"
			/>
		</div>
	);
}
