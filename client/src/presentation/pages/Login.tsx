import BaseLayout from '../components/BaseLayout';
import FormLogin from '../components/FormLogin';
import HeaderBar from '../components/HeaderBar';

export default function Login(): JSX.Element {
	return (
		<BaseLayout>
			<HeaderBar title="Login" />

			<FormLogin />
		</BaseLayout>
	);
}
