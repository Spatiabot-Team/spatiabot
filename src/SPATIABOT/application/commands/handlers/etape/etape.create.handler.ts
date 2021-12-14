import {EtapeCreateCommand} from "../../impl/etape/etape.create.command";
import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {EtapeInterface} from "../../../../domain/interfaces/etape.interface";
import {ScenarioGetByIdQuery} from "../../../queries/impl/scenario/scenario.get-by-id.query";
import {Scenario} from "../../../../domain/entities/scenario";
import {ScenarioNotFoundException} from "../../../../domain/exceptions/scenario/scenario-not-found.exception";
import {ScenarioHasNotThisAuteurException} from "../../../../domain/exceptions/scenario/scenario-has-not-this-auteur.exception";
import {EtapeRepositoryInterface} from "../../../repositories/etape.repository.interface";
import {EtapeRepository} from "../../../../infrastructure/database/repositories/etape.repository";


@CommandHandler(EtapeCreateCommand)
export class EtapeCreateHandler implements IQueryHandler<EtapeCreateCommand> {

    constructor(
        private readonly queryBus: QueryBus,
        @InjectRepository(EtapeRepository) private readonly repository: EtapeRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     * @param query EtapeCreateCommand
     * @param query ScenarioHasNotThisAuteurException
     * @throws ScenarioNotFoundException
     */
    async execute(query: EtapeCreateCommand): Promise<EtapeInterface> {

        const scenarioFound = await this.queryBus.execute(new ScenarioGetByIdQuery(query.etape.scenarioId));

        this.verifyOrThrow(scenarioFound, query);

        return this.repository.save(query.etape);
    }

    verifyOrThrow(scenarioFound: Scenario | null, query: EtapeCreateCommand) {
        if (!scenarioFound) {
            throw new ScenarioNotFoundException();
        }

        if (!scenarioFound.hasAuteur(query.auteurId)) {
            throw new ScenarioHasNotThisAuteurException();
        }
    }
}
