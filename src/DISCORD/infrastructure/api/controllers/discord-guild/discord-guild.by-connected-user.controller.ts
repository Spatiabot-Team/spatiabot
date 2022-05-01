import {ApiTags} from "@nestjs/swagger";
import {Controller, Get, Request, UseGuards} from "@nestjs/common";
import {QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {
    DiscordGuildUserBySocialDiscordQuery
} from "../../../../application/queries/impl/discord-guild-user/discord-guild-user.by-social-discord.query";

@ApiTags('DiscordGuild')
@Controller('discord-guilds')
export class DiscordGuildByConnectedUserController {

    constructor(
        private readonly queryBus: QueryBus,
    ) {
    }

    @Get('by-connected-user')
    @UseGuards(JwtAuthGuard)
    async index(@Request() req) {
        try {

            if (!req.user.socialDiscord) {
                return {success: false, message: 'Connexion discord recquise'};
            }

            return (await this.queryBus.execute(new DiscordGuildUserBySocialDiscordQuery(req.user.socialDiscord.id)))
            .map(dgu => dgu.discordGuild)

        } catch (e: any) {
            console.error('DiscordGuildByConnectedUserController error : ', e);
        }
    }

}
