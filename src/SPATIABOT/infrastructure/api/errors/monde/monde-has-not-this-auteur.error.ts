import {AppError} from "../app.error";

export class MondeHasNotThisAuteurError extends AppError {
    message: string = 'MONDE_HAS_NOT_THIS_AUTEUR';
}
