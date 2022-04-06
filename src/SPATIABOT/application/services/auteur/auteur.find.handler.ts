import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {InjectRepository} from "@nestjs/typeorm";
import {Like} from "typeorm";
import {UserRepository} from "../../../../USER/infrastructure/database/repositories/user.repository";
import {UserRepositoryInterface} from "../../../../USER/application/repositories/user.repository.interface";
import {Auteur} from "../../../domain/entities/auteur";
import {AuteurFindQuery} from "./auteur.find.query";

export class AuteurFindHandler {

    constructor(
        @InjectRepository(UserRepository) private readonly repository: UserRepositoryInterface
    ) {
        this.repository = repository;
    }

    async execute(query: AuteurFindQuery): Promise<Auteur[] | null> {

        const users = await this.repository.find({
            where: {
                username: Like(query.username + '%')
            }
        });
        return users.map(user => Auteur.assignUser(user));
    }
}
