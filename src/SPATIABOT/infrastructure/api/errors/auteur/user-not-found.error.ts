import {AppError} from "../app.error";

export class UserNotFoundError extends AppError {
    message: string = 'AUTEUR_DOESNT_EXIST';
}
