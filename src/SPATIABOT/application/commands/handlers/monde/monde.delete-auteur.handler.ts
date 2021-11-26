import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {MondeRepository} from "../../../../infrastructure/database/repositories/monde.repository";
import {MondeRepositoryInterface} from "../../../repositories/monde.repository.interface";
import {MondeInterface} from "../../../../domain/interfaces/monde.interface";
import {MondeDoesntExistException} from "../../../../domain/exceptions/monde/monde-doesnt-exist.exception";
import {MondeHasNotThisAuteurException} from "../../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";
import {MondeGetByIdQuery} from "../../../queries/impl/monde/monde.get-by-id.query";
import {MondeDeleteAuteurCommand} from "../../impl/monde/monde.delete-auteur.command";


@CommandHandler(MondeDeleteAuteurCommand)
export class MondeDeleteAuteurHandler implements IQueryHandler<MondeDeleteAuteurCommand> {

    constructor(
        private readonly queryBus: QueryBus,
        @InjectRepository(MondeRepository) private readonly repository: MondeRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     * Supprime un monde s'il existe et si l'auteur est bien un auteur de ce monde
     * @param query MondeDeleteCommand
     * @throws MondeDoesntExistException
     * @throws MondeHasNotThisAuteurException
     */
    async execute(query: MondeDeleteAuteurCommand): Promise<MondeInterface> {

        const mondeFound = await this.queryBus.execute(new MondeGetByIdQuery(query.mondeId));

        if (!mondeFound) {
            throw new MondeDoesntExistException();
        }

        if (!mondeFound.hasAuteur(query.auteurId) || !mondeFound.hasAuteur(query.auteurToRemoveId)) {
            throw new MondeHasNotThisAuteurException();
        }

        mondeFound.removeAuteurId(query.auteurToRemoveId)

        return this.repository.save({id: mondeFound.id, auteurIds: mondeFound.auteurIds});
    }
}
