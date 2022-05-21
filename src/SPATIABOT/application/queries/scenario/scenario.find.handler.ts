import {InjectRepository} from "@nestjs/typeorm";
import {ScenarioRepository} from "../../../infrastructure/database/repositories/scenario.repository";
import {ScenarioRepositoryInterface} from "../../repositories/scenario.repository.interface";
import {ScenarioFindQuery} from "./scenario.find.query";
import {Scenario} from "../../../domain/entities/scenario";
import {ScenarioNotFoundException} from "../../../domain/exceptions/scenario/scenario-not-found.exception";

export class ScenarioFindHandler {

    constructor(
        @InjectRepository(ScenarioRepository) private readonly repository: ScenarioRepositoryInterface
    ) {
        this.repository = repository;
    }

    async execute(query: ScenarioFindQuery): Promise<Scenario | null> {

        const scenarioFound = await this.repository.findOne({
            where: {...query.scenario},
            relations: ['etapes', 'etapes.effets', 'etapes.reponses']
        });

        if (!scenarioFound) {
            throw new ScenarioNotFoundException();
        }

        let scenario = Object.assign(new Scenario(), scenarioFound);

        return scenario;
    }
}
