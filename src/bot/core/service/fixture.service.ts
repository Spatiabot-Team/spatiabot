import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {MondeRepository} from "../repository/monde.repository";
import {User} from "../../../users/core/entity/user.entity";
import {Monde} from "../entity/monde.entity";
import monde from "../fixture/monde";

@Injectable()
export class FixtureService {

    constructor(
        @InjectRepository(MondeRepository) private readonly mondeRepository: MondeRepository,
    ) {
    }

    async generateMonde(auteurs:User[]) : Promise<Monde>{



        monde.auteurs = auteurs;
        return await this.mondeRepository.save(monde);
    }
}
