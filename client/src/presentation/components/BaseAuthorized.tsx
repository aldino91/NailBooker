import { ReactNode, useEffect } from 'react';
import { fecthAuthorized } from '../../api/fetchAuthorized';
import LocalStorageHelper from '../../utils/localStorage';
import { useNavigate } from 'react-router-dom';

interface Props {
	children: ReactNode;
}

export default function BaseAuthorized({ children }: Props) {
	const localStorageId = new LocalStorageHelper<string>();
	const navigate = useNavigate();

	useEffect(() => {
		const checkAuthorization = async () => {
			try {
				const resp = await fecthAuthorized('login');
				console.log('Authorization response:', resp?.data);
				if (resp?.data?.user.role === 'admin') {
					localStorageId.save('userId', resp?.data?.user.id);
					navigate('/dashboard-admin');
				} else {
					navigate('/reserved');
				}
			} catch (err) {
				console.log('Authorization error:', err);
				navigate('/login');
			}
		};

		checkAuthorization();
	}, []);

	return <div>{children}</div>;
}
