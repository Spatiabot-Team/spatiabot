import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {MondeGetByIdQuery} from '../../impl/monde/monde.get-by-id.query';
import {InjectRepository} from "@nestjs/typeorm";
import {MondeRepository} from "../../../../infrastructure/database/repositories/monde.repository";
import {MondeRepositoryInterface} from "../../../repositories/monde.repository.interface";
import {Monde} from "../../../../domain/entities/monde";
import {MondeDoesntExistException} from "../../../../domain/exceptions/monde/monde-doesnt-exist.exception";
import {MondeHasNotThisAuteurException} from "../../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";
import {UserRepository} from "../../../../../USER/infrastructure/database/repositories/user.repository";
import {UserRepositoryInterface} from "../../../../../USER/application/repositories/user.repository.interface";
import {Auteur} from "../../../../domain/entities/auteur";
import {In} from "typeorm";

@QueryHandler(MondeGetByIdQuery)
export class MondeGetByIdHandler implements IQueryHandler<MondeGetByIdQuery> {

    constructor(
        @InjectRepository(MondeRepository) private readonly repository: MondeRepositoryInterface,
        @InjectRepository(UserRepository) private readonly userRepository: UserRepositoryInterface
    ) {
        this.repository = repository;
    }

    async execute(query: MondeGetByIdQuery): Promise<Monde | null> {

        const mondeFound = await this.repository.findOne(query.mondeId);

        if (!mondeFound) {
            throw new MondeDoesntExistException();
        }

        const monde = new Monde(mondeFound);

        // On va chercher les infos des auteurs car jusqu'ici on a que leurs ids
        const users = await this.userRepository.find({where : {
                id : In(monde.auteurIds)
        }});

        if(users && users.length > 0){
            monde.auteurs = users.map(user => Auteur.assignUser(user));
        }

        return monde;
    }
}
