import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export default function BaseLayout({ children }: Props): JSX.Element {
	return <div className="w-full lg:w-1/2 mx-auto">{children}</div>;
}
