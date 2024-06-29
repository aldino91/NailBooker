import BaseLayout from '../components/BaseLayout';
import FormRegister from '../components/FormRegister';
import HeaderBar from '../components/HeaderBar';

export default function Register(): JSX.Element {
	return (
		<BaseLayout>
			<HeaderBar title="Registrazione" href="login" />

			<FormRegister />
		</BaseLayout>
	);
}
