import {AppError} from "../app.error";

export class ScenarioNotFoundError extends AppError {
    message: string = 'SCENARIO_DOESNT_EXIST';
}
