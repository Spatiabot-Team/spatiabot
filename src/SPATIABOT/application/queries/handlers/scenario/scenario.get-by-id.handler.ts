import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {ScenarioGetByIdQuery} from "../../impl/scenario/scenario.get-by-id.query";
import {ScenarioRepository} from "../../../../infrastructure/database/repositories/scenario.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Scenario} from "../../../../domain/entities/scenario";
import {ScenarioRepositoryInterface} from "../../../repositories/scenario.repository.interface";

@QueryHandler(ScenarioGetByIdQuery)
export class ScenarioGetByIdHandler implements IQueryHandler<ScenarioGetByIdQuery> {

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
