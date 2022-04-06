import {AppError} from "../app.error";

export class ConsequencePossibleNotFoundError extends AppError {
    message: string = 'CONSEQUENCE_POSSIBLE_NOT_FOUND';
}
