import {ScenarioInterface} from "../../domain/interfaces/scenario.interface";
import {MondeInterface} from "../../domain/interfaces/monde.interface";
import {ScenarioLightInterface} from "../../domain/interfaces/scenario-light.interface";

export interface ScenarioRepositoryInterface {
    findOne(options : any) : Promise<MondeInterface>;
    findOneById(id: number): Promise<ScenarioInterface>;
    findAll(): Promise<ScenarioInterface[]>;
    findLightOfMonde(mondeId : string) : Promise<ScenarioLightInterface[]>

    save(scenario: ScenarioInterface): Promise<ScenarioInterface>;
    delete(scenarioId : string);
}
