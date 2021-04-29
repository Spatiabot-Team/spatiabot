import {Controller, Get, Param} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {FixtureService} from "./core/service/fixture.service";

@ApiTags('Initialise')
@Controller("users/init")
export class InitController {

    constructor(private fixtureService: FixtureService) {
    }

    @Get("/roles/:code")
    async initRoles(@Param("code") code: string) {

        if (process.env.KEY_INIT !== code) {
            return {'error': 'The code is wrong'};
        }

        const roles = await this.fixtureService.generateRoles();
        return {roles};
    }

    @Get("/:code")
    async init(@Param("code") code: string) {

        if (process.env.KEY_INIT !== code) {
            return {'error': 'The code is wrong'};
        }

        const roles = await this.fixtureService.generateRoles();
        const admins = await this.fixtureService.generateAdmins();
        return {roles, admins};
    }

}
