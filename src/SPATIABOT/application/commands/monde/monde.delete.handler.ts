import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {MondeDeleteCommand} from "./monde.delete.command";
import {MondeGetByIdHandler} from "../../queries/monde/monde.get-by-id.handler";
import {MondeIsAuteurValidation} from "../../validations/monde/monde.is-auteur.validation";
import {MondeRepositoryInterface} from "../../repositories/monde.repository.interface";
import {MondeRepository} from "../../../infrastructure/database/repositories/monde.repository";
import {MondeInterface} from "../../../domain/interfaces/monde.interface";
import {MondeIsAuteurQuery} from "../../validations/monde/monde.is-auteur.query";
import {MondeGetByIdQuery} from "../../queries/monde/monde.get-by-id.query";


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
