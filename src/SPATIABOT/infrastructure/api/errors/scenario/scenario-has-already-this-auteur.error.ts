import {AppError} from "../app.error";

export class ScenarioHasAlreadyThisAuteurError extends AppError {
    message: string = 'SCENARIO_HAS_ALREADY_THIS_AUTEUR';
}
