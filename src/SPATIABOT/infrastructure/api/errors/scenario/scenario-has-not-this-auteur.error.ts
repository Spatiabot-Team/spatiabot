import {AppError} from "../app.error";

export class ScenarioHasNotThisAuteurError extends AppError {
    message: string = 'SCENARIO_HAS_NOT_THIS_AUTEUR';
}
