import {Body, Controller, Get, Post} from '@nestjs/common';
import {UsersFixtures} from "../../USER/infrastructure/database/fixtures/users.fixtures";
import {ApiTags} from "@nestjs/swagger";
import {GenerateFixturesDto} from "../dtos/generate-fixtures.dto";

@ApiTags('Fixtures')
@Controller('fixtures')
export class FixturesController {

    constructor(
        private readonly usersFixtures: UsersFixtures
    ) {
    }

    @Post('generate')
    async generate(@Body() generateFixturesDto : GenerateFixturesDto) {
        if (process.env.KEY_INIT !== generateFixturesDto.code) {
            return {'error': 'The code is wrong'};
        }
        return await this.usersFixtures.generate();
    }

}
