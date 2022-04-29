import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {###Entity###NotFoundException} from "../../../../domain/exceptions/###entity-tiret###/###entity-tiret###-not-found.exception";
import {###Entity###Interface} from "../../../../domain/interfaces/###entity-tiret###.interface";
import {###Entity###GetByIdQuery} from "../../../queries/impl/###entity-tiret###/###entity-tiret###.get-by-id.query";
import {###Entity###Repository} from "../../../../infrastructure/database/repositories/###entity-tiret###.repository";
import {###Entity###RepositoryInterface} from "../../../repositories/###entity-tiret###.repository.interface";
import {###Entity###DeleteCommand} from "../../impl/###entity-tiret###/###entity-tiret###.delete.command";

@CommandHandler(###Entity###DeleteCommand)
export class ###Entity###DeleteHandler implements IQueryHandler<###Entity###DeleteCommand> {

    constructor(
        private readonly ###entityCase###GetByIdHandler: ###Entity###GetByIdHandler,
        @InjectRepository(###Entity###Repository) private readonly repository: ###Entity###RepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     * Supprime un ###entity### s'il existe et si l'auteur est bien un auteur de ce ###entity###
     * @param query ###Entity###DeleteCommand
     * @throws ###Entity###DoesntExistException
     * @throws ###Entity###HasNotThisAuteurException
     */
    async execute(query: ###Entity###DeleteCommand): Promise<###Entity###Interface> {
    this.effetGetByIdHandler
        const ###entityCase###Found = await this.###Entity###GetByIdHandler.execute(new ###Entity###GetByIdQuery(query.###entityCase###Id));

        if (!###entityCase###Found) {
            throw new ###Entity###NotFoundException();
        }

        return this.repository.delete(query.###entityCase###Id);
    }
}
