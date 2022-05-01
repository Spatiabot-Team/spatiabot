import {Controller, Get, Request, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "../../../database/repositories/user.repository";
import {UserRepositoryInterface} from "../../../../application/repositories/user.repository.interface";
import {JwtAuthGuard} from "../../security/jwt-auth.guard";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {AppError} from "../../../../../APP/errors/app.error";

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserProfileController {

    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepositoryInterface,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Get('/profile')
    @UseGuards(JwtAuthGuard)
    async login(@Request() req) {
        try{
            const user = await this.userRepository.findProfil(req.user.sub);

            if(!user){
                return {error : true, }
            }
            return {user: req.user};
        } catch (e) {
            return this.parseError(e);
        }

    }

    parseError(e): AppError {
        this.logger.error(e);
        return new AppError();
    }


}
