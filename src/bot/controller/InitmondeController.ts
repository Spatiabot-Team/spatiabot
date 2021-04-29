import {Controller, Get, Param} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {FixtureService} from "../core/service/fixture.service";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "../../users/core/repository/user.repository";

@ApiTags('Initialise')
@Controller("bot/init")
export class InitmondeController {

    constructor(
        private fixtureService: FixtureService,
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
    ) {
    }

    @Get("/:code")
    async init(@Param("code") code: string) {

        if (process.env.KEY_INIT !== code) {
            return {'error': 'The code is wrong'};
        }

        return {monde: await this.fixtureService.generateMonde(await this.userRepository.fetchAdmins())};
    }

}
