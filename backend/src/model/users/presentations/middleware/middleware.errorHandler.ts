import { Request, Response } from 'express';
import { UserNotFoundError } from '../../../../errors/users/user.not.found.error';
import { ErrorUserDtoRegister } from '../../../../errors/users/user.dto.register';
import { ErrorUserRegisterUseCase } from '../../../../errors/users/user.register.use.case';
import { ErrorSentEmail } from '../../../../errors/emails/ErrorSendEmails';
import { ErrorBookingBase } from '../../../../errors/bookings/error.base.booking';
import { ErrorCreatedDtos } from '../../../../errors/bookings/error.created.dtos';

const allError = [
	UserNotFoundError,
	ErrorUserDtoRegister,
	ErrorUserRegisterUseCase,
	ErrorSentEmail,
	ErrorBookingBase,
	ErrorCreatedDtos,
];

export function errorHandler(
	error: Error,
	req: Request,
	res: Response,
	next: Function
) {
	for (const error of allError) {
		if (
			error instanceof UserNotFoundError ||
			error instanceof ErrorUserDtoRegister ||
			error instanceof ErrorUserRegisterUseCase ||
			error instanceof ErrorSentEmail ||
			error instanceof ErrorBookingBase ||
			error instanceof ErrorCreatedDtos
		) {
			return res.status(404).json(new error(error.name));
		}
	}

	res.status(500).json({ message: error.message });
}
