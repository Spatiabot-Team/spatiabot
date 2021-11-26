import {ScenarioInterface} from "../../../../domain/interfaces/scenario.interface";

export class ScenarioCreateCommand {

    scenario: ScenarioInterface;
    auteurId: string;

    constructor(scenario: ScenarioInterface, auteurId: string) {
        this.scenario = scenario;
        this.scenario.auteurs = [auteurId];
        this.auteurId = auteurId;
    }
}
