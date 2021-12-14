import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {EtapeRepositoryInterface} from "src/SPATIABOT/application/repositories/etape.repository.interface";
import {EtapeInterface} from "../../../../domain/interfaces/etape.interface";
import {Etape} from "../../../../domain/entities/etape";
import {EtapeRepository} from "../../../../infrastructure/database/repositories/etape.repository";
import {EtapeGetByIdQuery} from "../../../queries/impl/etape/etape.get-by-id.query";
import {EtapeNotFoundException} from "../../../../domain/exceptions/etape/etape-not-found.exception";
import {EtapeUpdateCommand} from "../../impl/etape/etape.update.command";


@CommandHandler(EtapeUpdateCommand)
export class EtapeUpdateHandler implements IQueryHandler<EtapeUpdateCommand> {

    @InjectRepository(EtapeRepository) private readonly repository: EtapeRepositoryInterface;

    constructor(
        private readonly queryBus: QueryBus,
        @InjectRepository(EtapeRepository) repository: EtapeRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     *
     * @param query EtapeUpdateCommand
     * @throws EtapeNotFoundException
     */
    async execute(query: EtapeUpdateCommand): Promise<EtapeInterface> {

        const etapeFound = await this.queryBus.execute(new EtapeGetByIdQuery(query.etape.id));

        this.verifyOrThrow(etapeFound, query);

        return this.repository.save(query.etape);
    }

    verifyOrThrow(etapeFound: Etape | null, query: EtapeUpdateCommand) {
        if (!etapeFound) {
            throw new EtapeNotFoundException();
        }
    }

}
