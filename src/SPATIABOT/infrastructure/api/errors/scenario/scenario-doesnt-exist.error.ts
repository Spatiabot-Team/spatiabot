import {AppError} from "../app.error";

export class ScenarioDoesntExistError extends AppError {
    message: string = 'SCENARIO_DOESNT_EXIST';
}
