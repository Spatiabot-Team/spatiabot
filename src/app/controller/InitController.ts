import {Controller, Get, Param} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {FixtureService} from "../../database/service/fixture.service";

@ApiTags('Initialise')
@Controller("init")
export class InitController {

    constructor(private fixtureService: FixtureService) {
    }

    @Get("/:code")
    async init(@Param("code") code: string) {

        if (process.env.KEY_INIT !== code) {
            return {'error': 'The code is wrong'};
        }

        const roles = await this.fixtureService.generateRoles();
        const discordRoles = await this.fixtureService.generateDiscordRoles();
        const admins = await this.fixtureService.generateAdmins();
        const monde = await this.fixtureService.generateMonde(admins);
        return {roles, admins,discordRoles,monde};
    }

}
