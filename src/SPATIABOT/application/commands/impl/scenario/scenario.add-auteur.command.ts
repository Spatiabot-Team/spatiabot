export class ScenarioAddAuteurCommand {

    scenarioId: string;
    /** Auteur qui demande la suppression */
    auteurId: string;
    /** Auteur à retirer du scenario */
    auteurToAddId: string;

    constructor(scenarioId: string, auteurToAddId : string, auteurId: string) {
        this.scenarioId = scenarioId;
        this.auteurId = auteurId;
        this.auteurToAddId = auteurToAddId;
    }
}
