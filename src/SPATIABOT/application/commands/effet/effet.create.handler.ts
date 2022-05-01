import {EffetCreateCommand} from "./effet.create.command";
import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {EffetRepository} from "../../../infrastructure/database/repositories/effet.repository";
import {EffetRepositoryInterface} from "../../repositories/effet.repository.interface";
import {EffetInterface} from "../../../domain/interfaces/effet.interface";

@CommandHandler(EffetCreateCommand)
export class EffetCreateHandler implements IQueryHandler<EffetCreateCommand> {

    constructor(

        @InjectRepository(EffetRepository) private readonly repository: EffetRepositoryInterface
    ) {
        this.repository = repository;
    }

    /**
     * @param query EffetCreateCommand
     */
    async execute(query: EffetCreateCommand): Promise<EffetInterface> {
        return this.repository.save({
            ...query.Effet
        });
    }
}
