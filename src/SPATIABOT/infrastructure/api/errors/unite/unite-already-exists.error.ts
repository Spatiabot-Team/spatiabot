import {AppError} from "../app.error";

export class UniteAlreadyExistsError extends AppError {
    message: string = 'UNITE_ALREADY_EXISTS';
}
