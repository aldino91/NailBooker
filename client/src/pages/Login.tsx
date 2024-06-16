import BaseLayout from '../presentation/components/BaseLayout';
import FormLogin from '../components/FormLogin';
import HeaderBar from '../presentation/components/HeaderBar';

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
