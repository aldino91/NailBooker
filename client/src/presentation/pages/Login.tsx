import FormLogin from '../../components/FormLogin';
import BaseLayout from '../components/BaseLayout';
import HeaderBar from '../components/HeaderBar';

export default function Login(): JSX.Element {
	return (
		<BaseLayout>
			<div className="flex flex-col items-center  h-screen">
				<HeaderBar title="Login" />

				<FormLogin />
			</div>
		</BaseLayout>
	);
}
