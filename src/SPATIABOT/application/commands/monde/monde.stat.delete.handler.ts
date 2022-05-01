import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {MondeIsAuteurQuery} from "../../validations/monde/monde.is-auteur.query";
import {StatRepositoryInterface} from "../../repositories/stat.repository.interface";
import {MondeGetByIdHandler} from "../../queries/monde/monde.get-by-id.handler";
import {MondeGetByIdQuery} from "../../queries/monde/monde.get-by-id.query";
import {MondeInterface} from "../../../domain/interfaces/monde.interface";
import {MondeIsAuteurValidation} from "../../validations/monde/monde.is-auteur.validation";
import {StatRepository} from "../../../infrastructure/database/repositories/stat.repository";
import {MondeStatDeleteCommand} from "./monde.stat.delete.command";



@CommandHandler(MondeStatDeleteCommand)
export class MondeStatDeleteHandler implements IQueryHandler<MondeStatDeleteCommand> {

    constructor(
        private readonly mondeGetByIdHandler: MondeGetByIdHandler,
        private readonly mondeIsAuteurValidation: MondeIsAuteurValidation,
        @InjectRepository(StatRepository) private readonly repository: StatRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     * Supprime la stat après avoir vérifié que le monde indiqué existe et que l'utilisateur passé en paramètre y est autorisé
     * @param query MondeStatDeleteCommand
     * @throws MondeNotFoundException
     * @throws MondeHasNotThisAuteurException
     */
    async execute(query: MondeStatDeleteCommand): Promise<MondeInterface> {

        const mondeFound = await this.mondeGetByIdHandler.execute(new MondeGetByIdQuery(query.mondeId));

        await this.mondeIsAuteurValidation.execute( new MondeIsAuteurQuery(mondeFound, query.userId))

        return this.repository.delete(query.statId);
    }
}
