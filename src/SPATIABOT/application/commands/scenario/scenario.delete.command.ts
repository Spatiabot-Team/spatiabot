export class ScenarioDeleteCommand {

    scenarioId: string;
    auteurId: string;

    constructor(scenarioId: string, auteurId: string) {
        this.scenarioId = scenarioId;
        this.auteurId = auteurId;
    }
}
