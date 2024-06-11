export interface Booking {
	id: string;
	hourBook: string;
	time: string;
	available: boolean;
	status: string;
	reservarName: string;
	services?: string[];
	start: string;
	duration: string;
}

export interface ListBook {
	available: boolean;
	createdAt?: string;
	dayBook?: number;
	duration: string;
	hourBook: string;
	id?: string;
	start?: string;
	status: string;
	reservarName: string;
	time: string;
	services: string[];
	updatedAt?: string;
	usersId?: string;
}

export interface ModalData {
	id?: string;
	open: boolean;
	hour?: string;
	day?: number;
	status?: string;
	index?: number;
	name?: string;
	start?: string;
}
export interface ModalDataEdit {
	id?: string;
	open: boolean;
	hour?: string;
	day?: number;
	status?: string;
	index?: number;
	reservarName?: string;
	start?: string;
}

export interface typeNewBook {
	services?: string;
	type?: string;
	time: string;
	hourBook?: string;
	name?: string;
}

export interface ListBookDays {
	day: string;
	book: ListBook[];
}

export interface SelectedServices {
	services: string;
	type: string;
	duration: string;
}
