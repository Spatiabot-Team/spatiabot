import {ScenarioInterface} from "../../../domain/interfaces/scenario.interface";

export class ScenarioUpdateCommand {

    scenario: ScenarioInterface;
    auteurId: string;

    constructor(scenario: ScenarioInterface, auteurId: string) {
        this.scenario = scenario;
        this.auteurId = auteurId;
    }
}
