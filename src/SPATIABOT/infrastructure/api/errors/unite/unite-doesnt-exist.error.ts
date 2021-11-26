import {AppError} from "../app.error";

export class UniteDoesntExistError extends AppError {
    message: string = 'UNITE_DOESNT_EXISTS';
}
