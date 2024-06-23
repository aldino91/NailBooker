import { RotatingLines } from 'react-loader-spinner';

interface Props {
	width?: string;
	strokeColor?: string;
}

export default function LoadingSpinner({
	width = '23',
	strokeColor = 'rgb(226 232 240)',
}: Props): JSX.Element {
	return (
		<div className="w-1/6 flex flex-row justify-center">
			<RotatingLines
				visible={true}
				width={width}
				strokeWidth="5"
				animationDuration="0.60"
				ariaLabel="rotating-lines-loading"
				strokeColor={strokeColor}
			/>
		</div>
	);
}
