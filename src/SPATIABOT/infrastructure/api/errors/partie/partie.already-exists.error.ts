import {AppError} from "../app.error";

export class PartieAlreadyExistsError extends AppError {
    message: string = 'PARTIE_ALREADY_EXISTS';
}
