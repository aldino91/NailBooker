export interface Books {
	id: string;
	dayBook: number;
	hourBook: string;
	duration: string;
	status?: string;
	available?: boolean;
	reservarName?: string;
	services?: string[];
	time?: string;
	start?: string;
	usersId?: string;
}
