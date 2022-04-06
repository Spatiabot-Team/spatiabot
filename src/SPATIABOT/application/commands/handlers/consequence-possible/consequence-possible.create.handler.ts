import {ConsequencePossibleCreateCommand} from "../../impl/consequence-possible/consequence-possible.create.command";
import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {ConsequencePossibleRepository} from "../../../../infrastructure/database/repositories/consequence-possible.repository";
import {ConsequencePossibleRepositoryInterface} from "../../../repositories/consequence-possible.repository.interface";
import {ConsequencePossibleInterface} from "../../../../domain/interfaces/consequence-possible.interface";

@CommandHandler(ConsequencePossibleCreateCommand)
export class ConsequencePossibleCreateHandler implements IQueryHandler<ConsequencePossibleCreateCommand> {

    constructor(
        private readonly queryBus: QueryBus,
        @InjectRepository(ConsequencePossibleRepository) private readonly repository: ConsequencePossibleRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     * @param query ConsequencePossibleCreateCommand
     */
    async execute(query: ConsequencePossibleCreateCommand): Promise<ConsequencePossibleInterface> {
        return this.repository.save({
            ...query.Consequencepossible
        });
    }
}
