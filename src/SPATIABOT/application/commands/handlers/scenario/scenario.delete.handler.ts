import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {
    ScenarioHasNotThisAuteurException
} from "../../../../domain/exceptions/scenario/scenario-has-not-this-auteur.exception";
import {ScenarioNotFoundException} from "../../../../domain/exceptions/scenario/scenario-not-found.exception";
import {ScenarioInterface} from "../../../../domain/interfaces/scenario.interface";
import {ScenarioRepository} from "../../../../infrastructure/database/repositories/scenario.repository";
import {ScenarioRepositoryInterface} from "../../../repositories/scenario.repository.interface";
import {ScenarioDeleteCommand} from "../../impl/scenario/scenario.delete.command";
import {ScenarioGetByIdHandler} from "../../../services/scenario/scenario.get-by-id.handler";
import {ScenarioGetByIdQuery} from "../../../services/scenario/scenario.get-by-id.query";

@CommandHandler(ScenarioDeleteCommand)
export class ScenarioDeleteHandler implements IQueryHandler<ScenarioDeleteCommand> {

    constructor(
        private readonly scenarioGetByIdHandler: ScenarioGetByIdHandler,
        @InjectRepository(ScenarioRepository) private readonly repository: ScenarioRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     * Supprime un scenario s'il existe et si l'auteur est bien un auteur de ce scenario
     * @param query ScenarioDeleteCommand
     * @throws ScenarioNotFoundException
     * @throws ScenarioHasNotThisAuteurException
     */
    async execute(query: ScenarioDeleteCommand): Promise<ScenarioInterface> {

        const scenarioFound = await this.scenarioGetByIdHandler.execute(new ScenarioGetByIdQuery(query.scenarioId));

        if (!scenarioFound) {
            throw new ScenarioNotFoundException();
        }

        if (!scenarioFound.hasAuteur(query.auteurId)) {
            throw new ScenarioHasNotThisAuteurException();
        }

        return this.repository.delete(query.scenarioId);
    }
}
