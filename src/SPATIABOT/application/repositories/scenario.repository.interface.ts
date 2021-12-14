import {ScenarioInterface} from "../../domain/interfaces/scenario.interface";
import {MondeInterface} from "../../domain/interfaces/monde.interface";
import {ScenarioLightInterface} from "../../domain/interfaces/scenario-light.interface";

export interface ScenarioRepositoryInterface {
    find(options : any) : Promise<ScenarioInterface[]>;
    findOne(options : any) : Promise<ScenarioInterface>;
    findOneById(id: string): Promise<ScenarioInterface>;
    findAll(): Promise<ScenarioInterface[]>;
    findAllOfMonde(mondeId : string): Promise<ScenarioInterface[]>;
    findLightOfMonde(mondeId : string) : Promise<ScenarioLightInterface[]>

    save(scenario: ScenarioInterface): Promise<ScenarioInterface>;
    delete(scenarioId : string);
}
