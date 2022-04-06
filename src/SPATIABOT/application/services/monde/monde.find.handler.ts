import {InjectRepository} from "@nestjs/typeorm";
import {MondeRepositoryInterface} from "../../repositories/monde.repository.interface";
import {MondeRepository} from "../../../infrastructure/database/repositories/monde.repository";
import {Monde} from "../../../domain/entities/monde";
import {MondeFindQuery} from "./monde.find.query";

export class MondeFindHandler {

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
