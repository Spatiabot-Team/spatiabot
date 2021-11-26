import {AppError} from "../app.error";

export class EtapeDoesntExistError extends AppError {
    message: string = 'ETAPE_DOESNT_EXIST';
}
