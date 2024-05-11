import BaseLayout from '../components/BaseLayout';
import FormRegister from '../components/FormRegister';
import HeaderBar from '../components/HeaderBar';

export default function Register(): JSX.Element {
	return (
		<BaseLayout>
			<div className="flex flex-col items-center h-screen">
				<HeaderBar title="Registrazione" />

				<FormRegister />
			</div>
		</BaseLayout>
	);
}
