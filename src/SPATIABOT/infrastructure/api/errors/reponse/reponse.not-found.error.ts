import {AppError} from "../app.error";

export class ReponseNotFoundError extends AppError {
    message: string = 'REPONSE_NOT_FOUND';
}
