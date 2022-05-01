import {AppError} from "../app.error";

export class UniteNotFoundError extends AppError {
    message: string = 'UNITE_NOT_FOUND';
}
