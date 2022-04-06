import {PartieCreateCommand} from "../../impl/partie/partie.create.command";
import {CommandHandler, IQueryHandler, QueryBus} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {PartieRepository} from "../../../../infrastructure/database/repositories/partie.repository";
import {PartieRepositoryInterface} from "../../../repositories/partie.repository.interface";
import {PartieInterface} from "../../../../domain/interfaces/partie.interface";

@CommandHandler(PartieCreateCommand)
export class PartieCreateHandler implements IQueryHandler<PartieCreateCommand> {

    constructor(
        private readonly queryBus: QueryBus,
        @InjectRepository(PartieRepository) private readonly repository: PartieRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     * @param query PartieCreateCommand
     */
    async execute(query: PartieCreateCommand): Promise<PartieInterface> {
        return this.repository.save({
            ...query.partie
        });
    }
}
