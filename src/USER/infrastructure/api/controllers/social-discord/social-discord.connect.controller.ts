import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {InjectRepository} from "@nestjs/typeorm";
import {AuthGuard} from "@nestjs/passport";
import {JwtService} from "@nestjs/jwt";
import {
    SocialDiscordRepositoryInterface
} from "../../../../application/repositories/social-discord.repository.interface";
import {SocialDiscordRepository} from "../../../database/repositories/social-discord.repository";

@ApiTags('Users')
@ApiBearerAuth()
@Controller()
export class SocialDiscordConnectController {

    constructor(
        @InjectRepository(SocialDiscordRepository) private readonly socialDiscordRepository: SocialDiscordRepositoryInterface,
        private readonly jwtService: JwtService
    ) {
    }

    /**
     * Permet de connecter un compte discord à un compte local existant
     * @param req
     * @param body
     */
    @Post('auth/discord/connect')
    @UseGuards(AuthGuard('discord'))
    async connect(@Request() req, @Body() body: any) {
        const user = this.jwtService.verify(body.token);

        const a = await this.socialDiscordRepository.createSocialDiscord({
            ...req.user.socialDiscord,
            user: {id: user.id}
        });
        return {success: true};
    }


}
