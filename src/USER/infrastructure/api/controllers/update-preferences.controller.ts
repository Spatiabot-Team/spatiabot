import {Body, Controller, Get, Put, Request, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {UserService} from "../../../application/services/user.service";
import {JwtAuthGuard} from "../security/jwt-auth.guard";
import {PreferencesDto} from "../dtos/preferences.dto";
import {UserRepository} from "../../database/repositories/user.repository";
import {InjectRepository} from "@nestjs/typeorm";

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UpdatePreferencesController {

    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository
    ) {
    }

    @Put('/update-preferences')
    @UseGuards(JwtAuthGuard)
    async index(@Request() req,@Body() preferences: PreferencesDto) {
        return this.userRepository.save({id: req.user.id, preferences});
    }


}
