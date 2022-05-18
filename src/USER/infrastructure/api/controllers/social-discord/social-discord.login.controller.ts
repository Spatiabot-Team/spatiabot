import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";
import {SocialDiscordService} from "../../../../application/services/social-discord.service";
import {UserService} from "../../../../application/services/user.service";
import {InjectRepository} from "@nestjs/typeorm";
import {SocialDiscordRepository} from "../../../database/repositories/social-discord.repository";
import {UserRepository} from "../../../database/repositories/user.repository";
import {UserRepositoryInterface} from "../../../../application/repositories/user.repository.interface";

@ApiTags('Users')
@Controller()
export class SocialDiscordLoginController {

    constructor(
        private readonly socialDiscordService: SocialDiscordService,
        private readonly userService: UserService,
        @InjectRepository(SocialDiscordRepository) private readonly socialDiscordRepository: SocialDiscordRepository,
        @InjectRepository(UserRepository) private readonly userRepositoryInterface: UserRepositoryInterface,
    ) {
    }

    /**
     * Permet de s'authentifier
     * @param req
     */
    @Get('auth/discord/login')
    @UseGuards(AuthGuard('discord'))
    async discordAuth(@Req() req) {
        let user = await this.socialDiscordService.findOrCreateUser(req.user.socialDiscord);

        // //@todo réparer cette bidouille pour retourner directement this.userService.generateToken(user);
        await this.socialDiscordRepository.update({userId: user.id}, {accessToken: req.user.socialDiscord.accessToken});

        user.socialDiscord = req.user.socialDiscord;
        return this.userService.generateToken(
            await this.userRepositoryInterface.findProfil(user.id)
        );
    }
}
