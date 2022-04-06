
import {In} from "typeorm";
import {MondeNotFoundException} from "../../../domain/exceptions/monde/monde-not-found.exception";
import {MondeGetByIdQuery} from "./monde.get-by-id.query";
import {Monde} from "../../../domain/entities/monde";
import {Auteur} from "../../../domain/entities/auteur";
import {MondeRepository} from "../../../infrastructure/database/repositories/monde.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {MondeRepositoryInterface} from "../../repositories/monde.repository.interface";
import {UserRepository} from "../../../../USER/infrastructure/database/repositories/user.repository";
import {UserRepositoryInterface} from "../../../../USER/application/repositories/user.repository.interface";

export class MondeGetByIdHandler {

    constructor(
        @InjectRepository(MondeRepository) private readonly repository: MondeRepositoryInterface,
        @InjectRepository(UserRepository) private readonly userRepository: UserRepositoryInterface
    ) {
        this.repository = repository;
    }

    async execute(query: MondeGetByIdQuery): Promise<Monde | null> {

        const mondeFound = await this.repository.findOne(query.mondeId);

        if (!mondeFound) {
            throw new MondeNotFoundException();
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
