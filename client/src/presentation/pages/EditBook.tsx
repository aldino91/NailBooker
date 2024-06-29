import BaseLayout from '../components/BaseLayout';
import HeaderBar from '../components/HeaderBar';
import BodyEditBook from '../components/BodyEditBook';

export default function EditBook() {
	return (
		<BaseLayout>
			<HeaderBar title="Edit Book" href="dashboard-admin" />
			<BodyEditBook />
		</BaseLayout>
	);
}
