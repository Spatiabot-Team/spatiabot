import {Controller, Get, Request, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "../../../database/repositories/user.repository";
import {UserRepositoryInterface} from "../../../../application/repositories/user.repository.interface";
import {JwtAuthGuard} from "../../security/jwt-auth.guard";
import {AppError} from "../../../../../SPATIABOT/infrastructure/api/errors/app.error";
import {
    ScenarioNotFoundException
} from "../../../../../SPATIABOT/domain/exceptions/scenario/scenario-not-found.exception";
import {
    ScenarioNotFoundError
} from "../../../../../SPATIABOT/infrastructure/api/errors/scenario/scenario-not-found.error";
import {
    ScenarioHasNotThisAuteurException
} from "../../../../../SPATIABOT/domain/exceptions/scenario/scenario-has-not-this-auteur.exception";
import {
    ScenarioHasNotThisAuteurError
} from "../../../../../SPATIABOT/infrastructure/api/errors/scenario/scenario-has-not-this-auteur.error";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";

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
            console.log('je catch !');
            return this.parseError(e);
        }

    }

    parseError(e): AppError {
        this.logger.error(e);
        return new AppError();
    }


}
