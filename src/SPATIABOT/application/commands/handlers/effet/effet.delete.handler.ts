import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {EffetNotFoundException} from "../../../../domain/exceptions/effet/effet-not-found.exception";
import {EffetInterface} from "../../../../domain/interfaces/effet.interface";
import {EffetRepository} from "../../../../infrastructure/database/repositories/effet.repository";
import {EffetRepositoryInterface} from "../../../repositories/effet.repository.interface";
import {EffetDeleteCommand} from "../../impl/effet/effet.delete.command";
import {EffetGetByIdHandler} from "../../../services/effet/effet.get-by-id.handler";
import {EffetGetByIdQuery} from "../../../services/effet/effet.get-by-id.query";

@CommandHandler(EffetDeleteCommand)
export class EffetDeleteHandler implements IQueryHandler<EffetDeleteCommand> {

    constructor(
        private readonly effetGetByIdHandler: EffetGetByIdHandler,
        @InjectRepository(EffetRepository) private readonly repository: EffetRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     * Supprime un ###entity### s'il existe et si l'auteur est bien un auteur de ce ###entity###
     * @param query EffetDeleteCommand
     * @throws EffetDoesntExistException
     * @throws EffetHasNotThisAuteurException
     */
    async execute(query: EffetDeleteCommand): Promise<EffetInterface> {

        const EffetFound = await this.effetGetByIdHandler.execute(new EffetGetByIdQuery(query.EffetId));

        if (!EffetFound) {
            throw new EffetNotFoundException();
        }

        return this.repository.delete(query.EffetId);
    }
}
