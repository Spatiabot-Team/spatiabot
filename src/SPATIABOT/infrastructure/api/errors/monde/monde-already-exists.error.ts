import {AppError} from "../app.error";

export class MondeAlreadyExistsError extends AppError {
    message: string = 'MONDE_ALREADY_EXISTS';
}
