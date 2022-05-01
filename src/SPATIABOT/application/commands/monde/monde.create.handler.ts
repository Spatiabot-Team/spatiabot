import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {MondeCreateCommand} from "../monde/monde.create.command";
import {MondeRepositoryInterface} from "../../repositories/monde.repository.interface";
import {MondeRepository} from "../../../infrastructure/database/repositories/monde.repository";
import {MondeInterface} from "../../../domain/interfaces/monde.interface";
import {MondeAlreadyExistsException} from "../../../domain/exceptions/monde/monde-already-exists.exception";
import slugify from "slugify";
import {MondeFindHandler} from "../../queries/monde/monde.find.handler";
import {MondeFindQuery} from "../../queries/monde/monde.find.query";


@CommandHandler(MondeCreateCommand)
export class MondeCreateHandler implements IQueryHandler<MondeCreateCommand> {

    constructor(
        private readonly mondeFindHandler: MondeFindHandler,
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

        const mondeFound = await this.mondeFindHandler.execute(new MondeFindQuery(query.monde));

        if (mondeFound) {
            throw new MondeAlreadyExistsException();
        }

        return this.repository.save({...query.monde, slug : slugify(query.monde.nom,{lower:true})});
    }
}
