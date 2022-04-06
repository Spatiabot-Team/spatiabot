import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {MondeDeleteCommand} from "../../impl/monde/monde.delete.command";
import {MondeRepository} from "../../../../infrastructure/database/repositories/monde.repository";
import {MondeRepositoryInterface} from "../../../repositories/monde.repository.interface";
import {MondeInterface} from "../../../../domain/interfaces/monde.interface";
import {MondeNotFoundException} from "../../../../domain/exceptions/monde/monde-not-found.exception";
import {MondeHasNotThisAuteurException} from "../../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";
import {MondeGetByIdHandler} from "../../../services/monde/monde.get-by-id.handler";
import {MondeGetByIdQuery} from "../../../services/monde/monde.get-by-id.query";
import {MondeIsAuteurQuery} from "../../../validations/monde/monde.is-auteur.query";
import {MondeIsAuteurValidation} from "../../../validations/monde/monde.is-auteur.validation";



@CommandHandler(MondeDeleteCommand)
export class MondeDeleteHandler implements IQueryHandler<MondeDeleteCommand> {

    constructor(
        private readonly mondeGetByIdHandler: MondeGetByIdHandler,
        private readonly mondeIsAuteurValidation: MondeIsAuteurValidation,
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

        const mondeFound = await this.mondeGetByIdHandler.execute(new MondeGetByIdQuery(query.mondeId));

        await this.mondeIsAuteurValidation.execute( new MondeIsAuteurQuery(mondeFound, query.auteurId))

        return this.repository.delete(query.mondeId);
    }
}
