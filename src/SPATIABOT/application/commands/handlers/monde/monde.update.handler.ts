import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import { MondeRepositoryInterface } from "src/SPATIABOT/application/repositories/monde.repository.interface";
import { MondeUpdateCommand } from "../../impl/monde/monde.update.command";
import {MondeInterface} from "../../../../domain/interfaces/monde.interface";
import {Monde} from "../../../../domain/entities/monde";
import {MondeRepository} from "../../../../infrastructure/database/repositories/monde.repository";
import {MondeGetByIdQuery} from "../../../queries/impl/monde/monde.get-by-id.query";
import {MondeDoesntExistException} from "../../../../domain/exceptions/monde/monde-doesnt-exist.exception";
import {MondeHasNotThisAuteurException} from "../../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";


@CommandHandler(MondeUpdateCommand)
export class MondeUpdateHandler implements IQueryHandler<MondeUpdateCommand> {

    @InjectRepository(MondeRepository) private readonly repository: MondeRepositoryInterface;

    constructor(
        private readonly queryBus: QueryBus,
        @InjectRepository(MondeRepository) repository: MondeRepositoryInterface
    ) {
        this.repository = repository;
        this.repository = repository;
    }

    /**
     *
     * @param query MondeUpdateCommand
     * @throws MondeDoesntExistException
     * @throws MondeHasNotThisAuteurException
     */
    async execute(query: MondeUpdateCommand): Promise<MondeInterface> {

        const mondeFound = await this.queryBus.execute(new MondeGetByIdQuery(query.monde.id));

        this.verifyOrThrow(mondeFound, query);

        return this.repository.save(query.monde);
    }

    verifyOrThrow(mondeFound: Monde | null, query: MondeUpdateCommand) {
        if (!mondeFound) {
            throw new MondeDoesntExistException();
        }

        if (!mondeFound.hasAuteur(query.auteurId)) {
            throw new MondeHasNotThisAuteurException();
        }
    }

}
