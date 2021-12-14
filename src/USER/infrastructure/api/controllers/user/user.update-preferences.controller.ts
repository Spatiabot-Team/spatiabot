import {Body, Controller, Put, Request, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "../../../database/repositories/user.repository";
import {PreferencesDto} from "../../dtos/preferences.dto";
import {JwtAuthGuard} from "../../security/jwt-auth.guard";

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserUpdatePreferencesController {

    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository
    ) {
    }

    @Put('/update-preferences')
    @UseGuards(JwtAuthGuard)
    async index(@Request() req, @Body() preferences: PreferencesDto) {
        return this.userRepository.save({id: req.user.id, preferences});
    }


}
