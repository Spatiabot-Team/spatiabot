import {AppError} from "../app.error";

export class MondeNotFoundError extends AppError {
    message: string = 'MONDE_NOT_FOUND';
}
