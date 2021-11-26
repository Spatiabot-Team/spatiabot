import {AppError} from "../app.error";

export class MondeDoesntExistError extends AppError {
    message: string = 'MONDE_DOESNT_EXIST';
}
