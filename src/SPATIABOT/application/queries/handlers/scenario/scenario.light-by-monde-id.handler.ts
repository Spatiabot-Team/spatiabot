import {IQueryHandler, QueryBus, QueryHandler} from "@nestjs/cqrs";
import {ScenarioRepository} from "../../../../infrastructure/database/repositories/scenario.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {ScenarioRepositoryInterface} from "../../../repositories/scenario.repository.interface";
import {ScenarioLightByMondeIdQuery} from "../../impl/scenario/scenario.light-by-monde-id.query";
import {ScenarioLightInterface} from "../../../../domain/interfaces/scenario-light.interface";
import {MondeGetByIdQuery} from "../../impl/monde/monde.get-by-id.query";
import {MondeNotFoundException} from "../../../../domain/exceptions/monde/monde-not-found.exception";

/**
 * Retourne une version light de tous les scenarios d'un monde
 */
@QueryHandler(ScenarioLightByMondeIdQuery)
export class ScenarioLightByMondeIdHandler implements IQueryHandler<ScenarioLightByMondeIdQuery> {

    constructor(
        @InjectRepository(ScenarioRepository) private readonly repository: ScenarioRepositoryInterface,
        private readonly queryBus: QueryBus,
    ) {
        this.repository = repository;
    }

    async execute(query: ScenarioLightByMondeIdQuery): Promise<ScenarioLightInterface[] | null> {

        const mondeFound = await this.queryBus.execute(new MondeGetByIdQuery(query.mondeId));

        if (!mondeFound) {
            throw new MondeNotFoundException();
        }

        return this.repository.findLightOfMonde(query.mondeId);
    }
}
