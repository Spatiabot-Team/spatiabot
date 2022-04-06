import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {###Entity###RepositoryInterface} from "src/SPATIABOT/application/repositories/###entity-tiret###.repository.interface";
import {###Entity###Interface} from "../../../../domain/interfaces/###entity-tiret###.interface";
import {###Entity###} from "../../../../domain/entities/###entity-tiret###";
import {###Entity###Repository} from "../../../../infrastructure/database/repositories/###entity-tiret###.repository";
import {###Entity###GetByIdQuery} from "../../../queries/impl/###entity-tiret###/###entity-tiret###.get-by-id.query";
import {###Entity###NotFoundException} from "../../../../domain/exceptions/###entity-tiret###/###entity-tiret###.not-found.exception";
import {###Entity###UpdateCommand} from "../../impl/###entity-tiret###/###entity-tiret###.update.command";


@CommandHandler(###Entity###UpdateCommand)
export class ###Entity###UpdateHandler implements IQueryHandler<###Entity###UpdateCommand> {

    @InjectRepository(###Entity###Repository) private readonly repository: ###Entity###RepositoryInterface;

    constructor(
        private readonly queryBus: QueryBus,
        @InjectRepository(###Entity###Repository) repository: ###Entity###RepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     *
     * @param query ###Entity###UpdateCommand
     * @throws ###Entity###NotFoundException
     */
    async execute(query: ###Entity###UpdateCommand): Promise<###Entity###Interface> {

        const ###entityCase###Found = await this.queryBus.execute(new ###Entity###GetByIdQuery(query.###entityCase###.id));

        this.verifyOrThrow(###entityCase###Found, query);

        return this.repository.save(query.###entityCase###);
    }

    verifyOrThrow(###entityCase###Found: ###Entity### | null, query: ###Entity###UpdateCommand) {
        if (!###entityCase###Found) {
            throw new ###Entity###NotFoundException();
        }
    }

}
