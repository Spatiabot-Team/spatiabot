import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {MondeDeleteCommand} from "../../impl/monde/monde.delete.command";
import {MondeRepository} from "../../../../infrastructure/database/repositories/monde.repository";
import {MondeRepositoryInterface} from "../../../repositories/monde.repository.interface";
import {MondeInterface} from "../../../../domain/interfaces/monde.interface";
import {MondeNotFoundException} from "../../../../domain/exceptions/monde/monde-not-found.exception";
import {MondeHasNotThisAuteurException} from "../../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";
import {MondeGetByIdQuery} from "../../../queries/impl/monde/monde.get-by-id.query";


@CommandHandler(MondeDeleteCommand)
export class MondeDeleteHandler implements IQueryHandler<MondeDeleteCommand> {

    constructor(
        private readonly queryBus: QueryBus,
        @InjectRepository(MondeRepository) private readonly repository: MondeRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     * Supprime un monde s'il existe et si l'auteur est bien un auteur de ce monde
     * @param query MondeDeleteCommand
     * @throws MondeNotFoundException
     * @throws MondeHasNotThisAuteurException
     */
    async execute(query: MondeDeleteCommand): Promise<MondeInterface> {

        const mondeFound = await this.queryBus.execute(new MondeGetByIdQuery(query.mondeId));

        if (!mondeFound) {
            throw new MondeNotFoundException();
        }

        if (!mondeFound.hasAuteur(query.auteurId)) {
            throw new MondeHasNotThisAuteurException();
        }

        return this.repository.delete(query.mondeId);
    }
}
