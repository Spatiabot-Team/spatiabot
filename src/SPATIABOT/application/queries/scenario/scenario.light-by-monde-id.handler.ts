/**
 * Retourne une version light de tous les scenarios d'un monde
 */
import {InjectRepository} from "@nestjs/typeorm";
import {ScenarioRepository} from "../../../infrastructure/database/repositories/scenario.repository";
import {ScenarioRepositoryInterface} from "../../repositories/scenario.repository.interface";
import {ScenarioLightByMondeIdQuery} from "./scenario.light-by-monde-id.query";
import {ScenarioLightInterface} from "../../../domain/interfaces/scenario-light.interface";
import {MondeGetByIdQuery} from "../monde/monde.get-by-id.query";
import {MondeNotFoundException} from "../../../domain/exceptions/monde/monde-not-found.exception";
import {MondeGetByIdHandler} from "../monde/monde.get-by-id.handler";


export class ScenarioLightByMondeIdHandler {

    constructor(
        @InjectRepository(ScenarioRepository) private readonly repository: ScenarioRepositoryInterface,
        private readonly mondeGetByIdHandler: MondeGetByIdHandler,
    ) {
        this.repository = repository;
    }

    async execute(query: ScenarioLightByMondeIdQuery): Promise<ScenarioLightInterface[] | null> {

        const mondeFound = await this.mondeGetByIdHandler.execute(new MondeGetByIdQuery(query.mondeId));

        if (!mondeFound) {
            throw new MondeNotFoundException();
        }

        return this.repository.findLightOfMonde(query.mondeId);
    }
}
