import {ScenarioItf} from "../../domain/interfaces/scenario.interface";

export interface ScenarioRepositoryItf {
    findOneById(id: number): Promise<ScenarioItf>;
    findAll(): Promise<ScenarioItf[]>;
}
