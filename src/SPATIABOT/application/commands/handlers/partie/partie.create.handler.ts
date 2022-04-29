import {PartieCreateCommand} from "../../impl/partie/partie.create.command";
import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {PartieRepository} from "../../../../infrastructure/database/repositories/partie.repository";
import {PartieRepositoryInterface} from "../../../repositories/partie.repository.interface";
import {PartieInterface} from "../../../../domain/interfaces/partie.interface";
import {PartieFindQuery} from "../../../services/partie/partie.find.query";
import {PartieFindHandler} from "../../../services/partie/partie.find.handler";
import {PartieAlreadyExistsException} from "../../../../domain/exceptions/partie/partie.already-exists.exception";

@CommandHandler(PartieCreateCommand)
export class PartieCreateHandler implements IQueryHandler<PartieCreateCommand> {

    constructor(
        @InjectRepository(PartieRepository) private readonly repository: PartieRepositoryInterface,
        private readonly partieFindHandler : PartieFindHandler
    ) {
        this.repository = repository;
    }

    /**
     * @param query PartieCreateCommand
     * @throws
     */
    async execute(query: PartieCreateCommand): Promise<PartieInterface> {
        const partieFound = await this.partieFindHandler.execute(
            new PartieFindQuery(query.partie.mondeId, query.partie.discordGuildUuid)
        );

        if(partieFound.length > 0){
            throw new PartieAlreadyExistsException();
        }

        return this.repository.save({
            ...query.partie
        });
    }
}
