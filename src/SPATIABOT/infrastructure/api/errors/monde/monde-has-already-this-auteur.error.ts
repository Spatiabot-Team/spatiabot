import {AppError} from "../app.error";

export class MondeHasAlreadyThisAuteurError extends AppError {
    message: string = 'MONDE_HAS_ALREADY_THIS_AUTEUR';
}
