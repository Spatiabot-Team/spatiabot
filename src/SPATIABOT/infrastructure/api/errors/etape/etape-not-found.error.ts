import {AppError} from "../app.error";

export class EtapeNotFoundError extends AppError {
    message: string = 'ETAPE_NOT_FOUND';
}
