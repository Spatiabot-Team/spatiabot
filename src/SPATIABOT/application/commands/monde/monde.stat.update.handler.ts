import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {MondeInterface} from "../../../domain/interfaces/monde.interface";
import {MondeNotFoundException} from "../../../domain/exceptions/monde/monde-not-found.exception";
import {MondeHasNotThisAuteurException} from "../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";
import {MondeGetByIdHandler} from "../../queries/monde/monde.get-by-id.handler";
import {MondeGetByIdQuery} from "../../queries/monde/monde.get-by-id.query";
import {StatRepository} from "../../../infrastructure/database/repositories/stat.repository";
import {StatRepositoryInterface} from "../../repositories/stat.repository.interface";
import {MondeIsAuteurValidation} from "../../validations/monde/monde.is-auteur.validation";
import {MondeIsAuteurQuery} from "../../validations/monde/monde.is-auteur.query";
import {MondeStatUpdateCommand} from "../monde/monde.stat.update.command";
import {StatNotFoundException} from "../../../domain/exceptions/stat/stat.not-found.exception";


@CommandHandler(MondeStatUpdateCommand)
export class MondeStatUpdateHandler implements IQueryHandler<MondeStatUpdateCommand> {

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
    async execute(query: MondeStatUpdateCommand): Promise<MondeInterface> {

        const mondeFound = await this.mondeGetByIdHandler.execute(new MondeGetByIdQuery(query.mondeId));

        await this.mondeIsAuteurValidation.execute(new MondeIsAuteurQuery(mondeFound, query.userId))

        const stat = await this.repository.findOne({id: query.statId, mondeId: query.mondeId})

        if (!stat) {
            throw new StatNotFoundException();
        }

        return this.repository.save({
            id: stat.id,
            texte: query.stat.texte,
            quantite: query.stat.quantite,
            unite: {id: query.stat.unite.id}
        });
    }
}
