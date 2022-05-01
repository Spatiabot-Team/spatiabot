import {AppError} from "../app.error";

export class StatNotFoundError extends AppError {
    message: string = 'STAT_NOT_FOUND';
}
