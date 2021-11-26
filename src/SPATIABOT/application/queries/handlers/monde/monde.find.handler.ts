import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {InjectRepository} from "@nestjs/typeorm";
import { MondeFindQuery } from '../../impl/monde/monde.find.query';
import {MondeRepository} from "../../../../infrastructure/database/repositories/monde.repository";
import {MondeRepositoryInterface} from "../../../repositories/monde.repository.interface";
import {Monde} from "../../../../domain/entities/monde";

@QueryHandler(MondeFindQuery)
export class MondeFindHandler implements IQueryHandler<MondeFindQuery> {

    constructor(
        @InjectRepository(MondeRepository) private readonly repository: MondeRepositoryInterface
    ) {
        this.repository = repository;
    }

    async execute(query: MondeFindQuery): Promise<Monde | null> {

        const mondeFound = await this.repository.findOne({
            where: {...query.monde}
        });
        if (!mondeFound) {
            return null;
        }
        return new Monde(mondeFound);
    }
}
