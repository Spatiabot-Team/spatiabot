import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {MondeRepository} from "../../../infrastructure/database/repositories/monde.repository";
import {MondeRepositoryInterface} from "../../repositories/monde.repository.interface";
import {MondeInterface} from "../../../domain/interfaces/monde.interface";
import {MondeNotFoundException} from "../../../domain/exceptions/monde/monde-not-found.exception";
import {MondeHasNotThisAuteurException} from "../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";
import {MondeDeleteAuteurCommand} from "../monde/monde.delete-auteur.command";
import {MondeGetByIdHandler} from "../../queries/monde/monde.get-by-id.handler";
import {MondeGetByIdQuery} from "../../queries/monde/monde.get-by-id.query";


@CommandHandler(MondeDeleteAuteurCommand)
export class MondeDeleteAuteurHandler implements IQueryHandler<MondeDeleteAuteurCommand> {

    constructor(
        private readonly mondeGetByIdHandler: MondeGetByIdHandler,
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
    async execute(query: MondeDeleteAuteurCommand): Promise<MondeInterface> {

        const mondeFound = await this.mondeGetByIdHandler.execute(new MondeGetByIdQuery(query.mondeId));

        if (!mondeFound) {
            throw new MondeNotFoundException();
        }

        if (!mondeFound.hasAuteur(query.auteurId) || !mondeFound.hasAuteur(query.auteurToRemoveId)) {
            throw new MondeHasNotThisAuteurException();
        }

        mondeFound.removeAuteurId(query.auteurToRemoveId)

        return this.repository.save({id: mondeFound.id, auteurIds: mondeFound.auteurIds});
    }
}
