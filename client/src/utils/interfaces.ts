export interface Booking {
	hourBook: string;
	time: string;
	available: boolean;
	status: string;
	name: string;
	start: string;
	duration: string;
}

export interface ListBook {
	services: string | string[];
	type: string;
	duration: string;
	hourBook: string;
	name: string;
}

export interface ModalData {
	open: boolean;
	hour?: string;
	day?: string;
	status?: string;
	index?: number;
	name?: string;
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

// export interface SelectedServices {
// 	services: string;
// 	type: string;
// 	time: string;
// 	hourBook
// }
