import {Body, Controller, Post} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "../core/repository/user.repository";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {EncrDecrService} from "./enc-decr.service";
import {UserRegisterDto} from "../core/dto/user-register.dto";
import {SocialLocalRepository} from "../core/repository/social-local.repository";

@ApiTags('Users')
@ApiBearerAuth()
@Controller()
export class LocalController {

    constructor(
        @InjectRepository(SocialLocalRepository) public readonly socialLocalRepository: SocialLocalRepository,
        @InjectRepository(UserRepository) public readonly userRepository: UserRepository,
        private encrDecrService: EncrDecrService,
    ) {
    }

    @Post('local/register')
    public async post(@Body() user: UserRegisterDto) {

        if (!user.username || (!user.password && user.password.length > 3)) {
            return {
                success: false,
                error: 'FIELD_EMPTY'
            }
        }

        // Does this user exists ?
        const userDb = await this.socialLocalRepository.findByUsername(user.username);
        if (userDb !== undefined) {
            return {
                success: false,
                error: 'USERNAME_ALREADY_EXIST'
            }
        }

        // Create
        await this.userRepository.save({
            username: user.username,
            email: user.email,
            socialLocal: await this.socialLocalRepository.save({
                username: user.username,
                password: this.encrDecrService.encrypt(process.env.salt, user.password)
            })
        });

        return {
            success: true
        }
    }


}
