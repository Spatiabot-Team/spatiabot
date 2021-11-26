import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {MondeCreateCommand} from "../../impl/monde/monde.create.command";
import {MondeRepositoryInterface} from "../../../repositories/monde.repository.interface";
import {MondeRepository} from "../../../../infrastructure/database/repositories/monde.repository";
import {MondeInterface} from "../../../../domain/interfaces/monde.interface";
import {MondeAlreadyExistsException} from "../../../../domain/exceptions/monde/monde-already-exists.exception";
import {MondeFindQuery} from "../../../queries/impl/monde/monde.find.query";


@CommandHandler(MondeCreateCommand)
export class MondeCreateHandler implements IQueryHandler<MondeCreateCommand> {

    constructor(
        private readonly queryBus: QueryBus,
        @InjectRepository(MondeRepository) private readonly repository: MondeRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     * Créer un monde, et ça, c'est beau.
     * @param query MondeCreateCommand
     * @throws MondeAlreadyExistsException
     */
    async execute(query: MondeCreateCommand): Promise<MondeInterface> {

        const mondeFound = await this.queryBus.execute(new MondeFindQuery(query.monde));

        if (mondeFound) {
            throw new MondeAlreadyExistsException();
        }

        return this.repository.save(query.monde);
    }
}
