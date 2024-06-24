import BaseLayout from '../components/BaseLayout';
import FormForgotPassword from '../components/FormForgotPassword';
import HeaderBar from '../components/HeaderBar';

export default function ForgotPassword(): JSX.Element {
	return (
		<BaseLayout>
			<div className="flex flex-col items-center  h-screen">
				<HeaderBar title="Forgot password" />

				<FormForgotPassword />
			</div>
		</BaseLayout>
	);
}
