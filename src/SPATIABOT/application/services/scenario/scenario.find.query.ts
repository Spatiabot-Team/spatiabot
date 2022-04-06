import {ScenarioInterface} from "../../../domain/interfaces/scenario.interface";

export class ScenarioFindQuery {

    /**
     * {id, mondeId, slug}
     */
    scenario: { id?: string, mondeId?: string, slug?: string };

    constructor(scenario: ScenarioInterface) {

        let s: any = {};

        if (scenario.id && scenario.id.length > 0) {
            s.id = scenario.id;
        }

        if (scenario.slug && scenario.slug.length > 0) {
            if(!scenario.mondeId){
                throw new Error('ScenarioFindQuery : Le mondeId est recquis pour une recherche par slug');
            }
            s.slug = scenario.slug;
            s.mondeId = scenario.mondeId;
        }

        this.scenario = s;
    }
}
