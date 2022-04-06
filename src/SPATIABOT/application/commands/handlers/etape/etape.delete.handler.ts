import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {EtapeDeleteCommand} from "../../impl/etape/etape.delete.command";
import {EtapeRepository} from "../../../../infrastructure/database/repositories/etape.repository";
import {EtapeRepositoryInterface} from "../../../repositories/etape.repository.interface";
import {EtapeGetByIdHandler} from "../../../services/etape/etape.get-by-id.handler";
import {EtapeInterface} from "../../../../domain/interfaces/etape.interface";
import {EtapeGetByIdQuery} from "../../../services/etape/etape.get-by-id.query";
import {EtapeNotFoundException} from "../../../../domain/exceptions/etape/etape-not-found.exception";
import {
    ScenarioHasNotThisAuteurException
} from "../../../../domain/exceptions/scenario/scenario-has-not-this-auteur.exception";
import {ScenarioGetByIdHandler} from "../../../services/scenario/scenario.get-by-id.handler";
import {ScenarioGetByIdQuery} from "../../../services/scenario/scenario.get-by-id.query";


@CommandHandler(EtapeDeleteCommand)
export class EtapeDeleteHandler implements IQueryHandler<EtapeDeleteCommand> {

    constructor(
        private readonly etapeGetByIdHandler: EtapeGetByIdHandler,
        private readonly scenarioGetByIdHandler: ScenarioGetByIdHandler,
        @InjectRepository(EtapeRepository) private readonly repository: EtapeRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     * Supprime un etape s'il existe et si l'auteur est bien un auteur de ce etape
     * @param query EtapeDeleteCommand
     * @throws EtapeNotFoundException
     * @throws EtapeHasNotThisAuteurException
     */
    async execute(query: EtapeDeleteCommand): Promise<EtapeInterface> {

        const etapeFound = await this.etapeGetByIdHandler.execute(new EtapeGetByIdQuery(query.etapeId));

        if (!etapeFound) {
            throw new EtapeNotFoundException();
        }

        const scenarioFound = await this.scenarioGetByIdHandler.execute(new ScenarioGetByIdQuery(etapeFound.scenarioId));

        if (!scenarioFound.hasAuteur(query.auteurId)) {
            throw new ScenarioHasNotThisAuteurException();
        }

        return this.repository.delete(query.etapeId);
    }
}
