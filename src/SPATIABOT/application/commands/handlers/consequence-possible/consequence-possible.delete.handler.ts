import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {ConsequencePossibleNotFoundException} from "../../../../domain/exceptions/consequence-possible/consequence-possible.not-found.exception";
import {ConsequencePossibleInterface} from "../../../../domain/interfaces/consequence-possible.interface";
import {ConsequencePossibleRepository} from "../../../../infrastructure/database/repositories/consequence-possible.repository";
import {ConsequencePossibleRepositoryInterface} from "../../../repositories/consequence-possible.repository.interface";
import {ConsequencePossibleDeleteCommand} from "../../impl/consequence-possible/consequence-possible.delete.command";
import {
    ConsequencePossibleGetByIdHandler
} from "../../../services/consequence-possible/consequence-possible.get-by-id.handler";
import {
    ConsequencePossibleGetByIdQuery
} from "../../../services/consequence-possible/consequence-possible.get-by-id.query";

@CommandHandler(ConsequencePossibleDeleteCommand)
export class ConsequencePossibleDeleteHandler implements IQueryHandler<ConsequencePossibleDeleteCommand> {

    constructor(
        private readonly consequencePossibleGetByIdHandler: ConsequencePossibleGetByIdHandler,
        @InjectRepository(ConsequencePossibleRepository) private readonly repository: ConsequencePossibleRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     * Supprime un ###entity### s'il existe et si l'auteur est bien un auteur de ce ###entity###
     * @param query ConsequencePossibleDeleteCommand
     * @throws ConsequencePossibleDoesntExistException
     * @throws ConsequencePossibleHasNotThisAuteurException
     */
    async execute(query: ConsequencePossibleDeleteCommand): Promise<ConsequencePossibleInterface> {

        const ConsequencepossibleFound = await this.consequencePossibleGetByIdHandler.execute(
            new ConsequencePossibleGetByIdQuery(query.ConsequencepossibleId)
        );

        if (!ConsequencepossibleFound) {
            throw new ConsequencePossibleNotFoundException();
        }

        return this.repository.delete(query.ConsequencepossibleId);
    }
}
