import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {EffetRepositoryInterface} from "src/SPATIABOT/application/repositories/effet.repository.interface";
import {EffetInterface} from "../../../../domain/interfaces/effet.interface";
import {Effet} from "../../../../domain/entities/effet";
import {EffetRepository} from "../../../../infrastructure/database/repositories/effet.repository";
import {EffetGetByIdQuery} from "../../../queries/impl/effet/effet.get-by-id.query";
import {EffetNotFoundException} from "../../../../domain/exceptions/effet/effet-not-found.exception";
import {EffetUpdateCommand} from "../../impl/effet/effet.update.command";


@CommandHandler(EffetUpdateCommand)
export class EffetUpdateHandler implements IQueryHandler<EffetUpdateCommand> {

    @InjectRepository(EffetRepository) private readonly repository: EffetRepositoryInterface;

    constructor(
        private readonly queryBus: QueryBus,
        @InjectRepository(EffetRepository) repository: EffetRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     *
     * @param query EffetUpdateCommand
     * @throws EffetNotFoundException
     */
    async execute(query: EffetUpdateCommand): Promise<EffetInterface> {

        const effetFound = await this.queryBus.execute(new EffetGetByIdQuery(query.effet.id));

        this.verifyOrThrow(effetFound, query);

        return this.repository.save(query.effet);
    }

    verifyOrThrow(effetFound: Effet | null, query: EffetUpdateCommand) {
        if (!effetFound) {
            throw new EffetNotFoundException();
        }
    }

}
