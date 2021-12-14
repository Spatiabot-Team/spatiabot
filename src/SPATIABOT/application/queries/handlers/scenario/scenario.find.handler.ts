import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {InjectRepository} from "@nestjs/typeorm";
import {ScenarioFindQuery} from '../../impl/scenario/scenario.find.query';
import {ScenarioRepository} from "../../../../infrastructure/database/repositories/scenario.repository";
import {ScenarioRepositoryInterface} from "../../../repositories/scenario.repository.interface";
import {Scenario} from "../../../../domain/entities/scenario";
import {ScenarioNotFoundException} from "../../../../domain/exceptions/scenario/scenario-not-found.exception";

@QueryHandler(ScenarioFindQuery)
export class ScenarioFindHandler implements IQueryHandler<ScenarioFindQuery> {

    constructor(
        @InjectRepository(ScenarioRepository) private readonly repository: ScenarioRepositoryInterface
    ) {
        this.repository = repository;
    }

    async execute(query: ScenarioFindQuery): Promise<Scenario | null> {

        const scenarioFound = await this.repository.findOne({
            where: {...query.scenario},
            relations : ['etapes','etapes.effets','etapes.reponses']
        });

        if (!scenarioFound) {
            throw new ScenarioNotFoundException();
        }

        let scenario = Object.assign(new Scenario(), scenarioFound);

        return scenario;
    }
}
