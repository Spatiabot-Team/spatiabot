import {###Entity###CreateCommand} from "../../impl/###entity-tiret###/###entity-tiret###.create.command";
import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {###Entity###Repository} from "../../../../infrastructure/database/repositories/###entity-tiret###.repository";
import {###Entity###RepositoryInterface} from "../../../repositories/###entity-tiret###.repository.interface";
import {###Entity###Interface} from "../../../../domain/interfaces/###entity-tiret###.interface";

@CommandHandler(###Entity###CreateCommand)
export class ###Entity###CreateHandler implements IQueryHandler<###Entity###CreateCommand> {

    constructor(
        private readonly queryBus: QueryBus,
        @InjectRepository(###Entity###Repository) private readonly repository: ###Entity###RepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     * @param query ###Entity###CreateCommand
     */
    async execute(query: ###Entity###CreateCommand): Promise<###Entity###Interface> {
        return this.repository.save({
            ...query.###entityCase###
        });
    }
}
