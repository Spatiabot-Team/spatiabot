import {Body, Controller, HttpException, HttpStatus, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {InjectRepository} from "@nestjs/typeorm";
import {CommandBus} from "@nestjs/cqrs";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {SocialLocalRepository} from "../../../database/repositories/social-local.repository";
import {UserRegisterDto} from "../../dtos/user-register.dto";
import {
    CreateUserWithSocialLocalCommand
} from "../../../../application/commands/impl/create-user-with-social-local.command";

@ApiTags('Users')
@Controller()
export class SocialLocalRegisterController {

    constructor(
        @InjectRepository(SocialLocalRepository) public readonly socialLocalRepository: SocialLocalRepository,
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Post('local/register')
    public async post(@Body() socialLocal: UserRegisterDto) {
        try {

            // Does this username already exists ?
            const socialLocalDb = await this.socialLocalRepository.findByUsername(socialLocal.username);
            if (socialLocalDb !== undefined) {
                return {
                    success: false,
                    error: 'USERNAME_ALREADY_EXIST'
                }
            }

            const user = await this.commandBus.execute(new CreateUserWithSocialLocalCommand(socialLocal));

            return user ? {success: true} : {success: false}

        } catch (e) {
            this.logger.error(e);
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Internal server error',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
