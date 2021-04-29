import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {InjectRepository} from "@nestjs/typeorm";
import {DiscordGuildRepository} from "../core/repository/discord-guild.repository";
import {JwtAuthGuard} from "../../users/auth/jwt-auth.guard";
import {DiscordApi} from "../core/service/discord-api.service";
import {SocialDiscordRepository} from "../../users/core/repository/social-discord.repository";
import {DiscordGuildService} from "../core/service/discord-guild.service";

@ApiBearerAuth()
@ApiTags('Discord')
@Controller('')
export class SyncUserDiscordGuildController {

    constructor(
        private discordGuildService: DiscordGuildService,
        @InjectRepository(SocialDiscordRepository) private readonly socialDiscordRepository: SocialDiscordRepository,
        private discordApi: DiscordApi
    ) {
    }

    @Get('discord/sync-my-guilds')
    @UseGuards(JwtAuthGuard)
    async syncMyGuilds(@Req() req) {

        if (!req.user.socialDiscord && !req.user.socialDiscord.discordId) {
            return [];
        }

        // Récupérer l'accesstoken
        const socialDiscord = await this.socialDiscordRepository.findByDiscordId(req.user.socialDiscord.discordId);

        // socialDiscord
        const guilds = await this.discordApi.getInfosUser(socialDiscord.accessToken);
        return await this.discordGuildService.createOrUpdateDiscordGuilds(socialDiscord, guilds);
        // return this.discordGuildRepository.findByDiscordId(req.user.socialDiscord.discordId);
    }
}
