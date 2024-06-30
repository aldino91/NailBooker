import BaseLayout from '../components/BaseLayout';
import BodyHome from '../../components/BodyHome';

export function Home(): JSX.Element {
	return (
		<BaseLayout>
			<div
				id="background-photo"
				className="w-full h-1/5 flex flex-row items-center justify-start shadow-header bg-layout"
			>
				<div className="pl-6">
					<h3 className="text-2xl lg:text-6xl font-semibold text-white">
						GB NAILS
					</h3>
				</div>
			</div>
			<BodyHome />
		</BaseLayout>
	);
}
