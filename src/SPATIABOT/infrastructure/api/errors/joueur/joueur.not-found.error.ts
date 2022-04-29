import {AppError} from "../app.error";

export class JoueurNotFoundError extends AppError {
    message: string = 'JOUEUR_NOT_FOUND';
}
