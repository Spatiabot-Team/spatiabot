import {AppError} from "../app.error";

export class EffetNotFoundError extends AppError {
    message: string = 'EFFET_NOT_FOUND';
}
