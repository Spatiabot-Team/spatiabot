import {IQueryHandler, QueryBus, QueryHandler} from "@nestjs/cqrs";
import {ScenarioGetByIdQuery} from "../../impl/scenario/scenario.get-by-id.query";
import {ScenarioRepository} from "../../../../infrastructure/database/repositories/scenario.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Scenario} from "../../../../domain/entities/scenario";
import {ScenarioRepositoryInterface} from "../../../repositories/scenario.repository.interface";
import {ScenarioLightByMondeIdQuery} from "../../impl/scenario/scenario.light-by-monde-id.query";
import {ScenarioLightInterface} from "../../../../domain/interfaces/scenario-light.interface";
import {MondeGetByIdQuery} from "../../impl/monde/monde.get-by-id.query";
import {MondeDoesntExistException} from "../../../../domain/exceptions/monde/monde-doesnt-exist.exception";

/**
 * Retourne une version light de tous les scenarios d'un monde
 */
@QueryHandler(ScenarioLightByMondeIdQuery)
export class ScenarioLightByMoneIdHandler implements IQueryHandler<ScenarioLightByMondeIdQuery> {

    constructor(
        @InjectRepository(ScenarioRepository) private readonly repository: ScenarioRepositoryInterface,
        private readonly queryBus: QueryBus,
    ) {
        this.repository = repository;
    }

    async execute(query: ScenarioLightByMondeIdQuery): Promise<ScenarioLightInterface[] | null> {

        const mondeFound = await this.queryBus.execute(new MondeGetByIdQuery(query.mondeId));

        if (!mondeFound) {
            throw new MondeDoesntExistException();
        }

        return this.repository.findLightOfMonde(query.mondeId);
    }
}
