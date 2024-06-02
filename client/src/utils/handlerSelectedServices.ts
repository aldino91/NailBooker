import { SelectedServices } from './interfaces';

type services = {
	services: string;
	type: string;
	time: string;
};

interface Props {
	data: SelectedServices;
	selectedServices: Array<services>;
	setSelectedServices: (arg: Array<services>) => void;
}

export const handlerSelected = ({
	data,
	selectedServices,
	setSelectedServices,
}: Props) => {
	setSelectedServices([...selectedServices, data]);
};
