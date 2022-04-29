import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {
    ConsequencePossibleRepositoryInterface
} from "src/SPATIABOT/application/repositories/consequence-possible.repository.interface";
import {ConsequencePossibleInterface} from "../../../../domain/interfaces/consequence-possible.interface";
import {ConsequencePossible} from "../../../../domain/entities/consequence-possible";
import {
    ConsequencePossibleRepository
} from "../../../../infrastructure/database/repositories/consequence-possible.repository";
import {
    ConsequencePossibleNotFoundException
} from "../../../../domain/exceptions/consequence-possible/consequence-possible.not-found.exception";
import {ConsequencePossibleUpdateCommand} from "../../impl/consequence-possible/consequence-possible.update.command";
import {
    ConsequencePossibleGetByIdHandler
} from "../../../services/consequence-possible/consequence-possible.get-by-id.handler";
import {
    ConsequencePossibleGetByIdQuery
} from "../../../services/consequence-possible/consequence-possible.get-by-id.query";


@CommandHandler(ConsequencePossibleUpdateCommand)
export class ConsequencePossibleUpdateHandler implements IQueryHandler<ConsequencePossibleUpdateCommand> {

    @InjectRepository(ConsequencePossibleRepository) private readonly repository: ConsequencePossibleRepositoryInterface;

    constructor(
        private readonly consequencePossibleGetByIdHandler: ConsequencePossibleGetByIdHandler,
        @InjectRepository(ConsequencePossibleRepository) repository: ConsequencePossibleRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     *
     * @param query ConsequencePossibleUpdateCommand
     * @throws ConsequencePossibleNotFoundException
     */
    async execute(query: ConsequencePossibleUpdateCommand): Promise<ConsequencePossibleInterface> {

        const consequencePossibleFound = await this.consequencePossibleGetByIdHandler.execute(
            new ConsequencePossibleGetByIdQuery(query.consequencePossible.id)
        );

        this.verifyOrThrow(consequencePossibleFound, query);

        return this.repository.save(query.consequencePossible);
    }

    verifyOrThrow(consequencePossibleFound: ConsequencePossible | null, query: ConsequencePossibleUpdateCommand) {
        if (!consequencePossibleFound) {
            throw new ConsequencePossibleNotFoundException();
        }
    }

}
