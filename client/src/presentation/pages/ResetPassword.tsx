import BaseLayout from '../components/BaseLayout';
import HeaderBar from '../components/HeaderBar';
import FormResetPassword from '../components/FormResetPassword';

export default function ResetPassword() {
	return (
		<BaseLayout>
			<div className="flex flex-col items-center  h-screen">
				<HeaderBar title="Reset password" />

				<FormResetPassword />
			</div>
		</BaseLayout>
	);
}
