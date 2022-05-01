import {ScenarioRepository} from "../../../infrastructure/database/repositories/scenario.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {ScenarioRepositoryInterface} from "../../repositories/scenario.repository.interface";
import {ScenarioIsAuteurQuery} from "./scenario.is-auteur.query";


export class ScenarioIsAuteurValidation {

    constructor(@InjectRepository(ScenarioRepository) private readonly repository: ScenarioRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: ScenarioIsAuteurQuery): Promise<boolean> {
        return true;
    }
}
