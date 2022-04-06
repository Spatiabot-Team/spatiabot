
import {InjectRepository} from "@nestjs/typeorm";

import {ScenarioRepositoryInterface} from "../../repositories/scenario.repository.interface";
import {Scenario} from "../../../domain/entities/scenario";
import {ScenarioRepository} from "../../../infrastructure/database/repositories/scenario.repository";
import {ScenarioGetByIdQuery} from "./scenario.get-by-id.query";

export class ScenarioGetByIdHandler {

    constructor(@InjectRepository(ScenarioRepository) private readonly repository: ScenarioRepositoryInterface) {
        this.repository = repository;
    }

    async execute(query: ScenarioGetByIdQuery): Promise<Scenario | null> {
        const scenarioFound = await this.repository.findOneById(query.id);
        if (!scenarioFound) {
            return null;
        }
        let scenario = Object.assign(new Scenario(), scenarioFound);
        // scenario.etapes = await scenarioFound.etapes;

        return scenario;
    }
}
