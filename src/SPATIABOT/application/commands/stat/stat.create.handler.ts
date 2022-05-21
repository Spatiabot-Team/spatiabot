import {StatCreateCommand} from "../stat/stat.create.command";
import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {StatRepository} from "../../../infrastructure/database/repositories/stat.repository";
import {StatRepositoryInterface} from "../../repositories/stat.repository.interface";
import {StatInterface} from "../../../domain/interfaces/stat.interface";

@CommandHandler(StatCreateCommand)
export class StatCreateHandler implements IQueryHandler<StatCreateCommand> {

    constructor(
        
        @InjectRepository(StatRepository) private readonly repository: StatRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     * @param query StatCreateCommand
     */
    async execute(query: StatCreateCommand): Promise<StatInterface> {
        return this.repository.save({
            ...query.stat
        });
    }
}
