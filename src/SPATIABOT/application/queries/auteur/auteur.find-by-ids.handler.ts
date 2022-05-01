import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "../../../../USER/infrastructure/database/repositories/user.repository";
import {UserRepositoryInterface} from "../../../../USER/application/repositories/user.repository.interface";
import {Auteur} from "../../../domain/entities/auteur";
import {AuteurFindByIdsQuery} from "./auteur.find-by-ids.query";

export class AuteurFindByIdsHandler {

    constructor(
        @InjectRepository(UserRepository) private readonly repository: UserRepositoryInterface
    ) {
        this.repository = repository;
    }

    async execute(query: AuteurFindByIdsQuery): Promise<Auteur[] | null> {

        const users = await this.repository.find(query.ids);
        return users.map(user => Auteur.assignUser(user));
    }
}
