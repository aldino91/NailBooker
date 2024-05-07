export class ErrorCreatedDtos extends Error {
	public readonly descriptions: string;
	constructor(public readonly message: string) {
		super(message);
		this.name = this.constructor.name;
		this.descriptions = this.message;
	}
}
