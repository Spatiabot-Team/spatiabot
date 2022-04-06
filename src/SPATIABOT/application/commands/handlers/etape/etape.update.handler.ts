import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {EtapeRepositoryInterface} from "src/SPATIABOT/application/repositories/etape.repository.interface";
import {EtapeInterface} from "../../../../domain/interfaces/etape.interface";
import {Etape} from "../../../../domain/entities/etape";
import {EtapeRepository} from "../../../../infrastructure/database/repositories/etape.repository";
import {EtapeNotFoundException} from "../../../../domain/exceptions/etape/etape-not-found.exception";
import {EtapeUpdateCommand} from "../../impl/etape/etape.update.command";
import {EtapeGetByIdHandler} from "../../../services/etape/etape.get-by-id.handler";
import {EtapeGetByIdQuery} from "../../../services/etape/etape.get-by-id.query";


@CommandHandler(EtapeUpdateCommand)
export class EtapeUpdateHandler implements IQueryHandler<EtapeUpdateCommand> {

    constructor(
        private readonly etapeGetByIdHandler: EtapeGetByIdHandler,
        @InjectRepository(EtapeRepository) private readonly repository: EtapeRepositoryInterface
    ) {
    }

    /**
     *
     * @param query EtapeUpdateCommand
     * @throws EtapeNotFoundException
     */
    async execute(query: EtapeUpdateCommand): Promise<EtapeInterface> {

        const etapeFound = await this.etapeGetByIdHandler.execute(new EtapeGetByIdQuery(query.etape.id));

        this.verifyOrThrow(etapeFound, query);

        return this.repository.save(query.etape);
    }

    verifyOrThrow(etapeFound: Etape | null, query: EtapeUpdateCommand) {
        if (!etapeFound) {
            throw new EtapeNotFoundException();
        }
    }

}
