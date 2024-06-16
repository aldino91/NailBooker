import BaseLayout from '../presentation/components/BaseLayout';
import FormRegister from '../components/FormRegister';
import HeaderBar from '../presentation/components/HeaderBar';

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
