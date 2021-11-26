import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {InjectRepository} from "@nestjs/typeorm";
import { MondeFindQuery } from '../../impl/monde/monde.find.query';
import {MondeRepository} from "../../../../infrastructure/database/repositories/monde.repository";
import {MondeRepositoryInterface} from "../../../repositories/monde.repository.interface";
import {Monde} from "../../../../domain/entities/monde";
import {AuteurFindQuery} from "../../impl/auteur/auteur.find.query";
import {UserRepository} from "../../../../../USER/infrastructure/database/repositories/user.repository";
import {UserRepositoryInterface} from "../../../../../USER/application/repositories/user.repository.interface";
import {Like} from "typeorm";
import {Auteur} from "../../../../domain/entities/auteur";

@QueryHandler(AuteurFindQuery)
export class AuteurFindHandler implements IQueryHandler<AuteurFindQuery> {

    constructor(
        @InjectRepository(UserRepository) private readonly repository: UserRepositoryInterface
    ) {
        this.repository = repository;
    }

    async execute(query: AuteurFindQuery): Promise<Auteur[] | null> {
console.log(query)
        const users = await this.repository.find({
            where: {
                username: Like(query.username + '%')
            }
        });
        return users.map(user => Auteur.assignUser(user));
    }
}
