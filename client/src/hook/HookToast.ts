import { toast } from 'react-toastify';

const useToast = () => {
	const notify = (message: string, type = 'default') => {
		if (type === 'default') {
			toast(message);
		}
		if (type === 'success') {
			toast(message, {
				className: 'toast-success',
				progressStyle: { background: 'rgb(16 185 129)' },
			});
		}
		if (type === 'error') {
			toast(message, {
				className: 'toast-error',
				progressStyle: { background: 'rgb(220 38 38)' },
			});
		}
		if (type === 'info') {
			toast(message, {
				className: 'toast-info',
				progressStyle: { background: 'rgb(49, 49, 241)' },
			});
		}
		if (type === 'warn') {
			toast(message, {
				className: 'toast-warn',
				progressStyle: { background: 'rgb(234 179 8) ' },
			});
		}
	};

	return { notify };
};

export default useToast;
