import {ApiTags} from "@nestjs/swagger";
import {Controller, Get, Request, UseGuards} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {DiscordApi} from "../../../../application/services/discord-api.service";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {
    DiscordGuildUserCreateCommand
} from "../../../../application/commands/impl/discord-guild-user/discord-guild-user.create.command";
import {DiscordGuildApiToEntityAdapter} from "../../adapters/discord-guild-api-to-entity.adapter";
import {
    DiscordGuildFindOrCreateHandler
} from "../../../../application/commands/handlers/discord-guild/discord-guild.find-or-create.handler";
import {
    DiscordGuildFindOrCreateCommand
} from "../../../../application/commands/impl/discord-guild/discord-guild.find-or-create.command";
import {
    DiscordGuildUserResetCommand
} from "../../../../application/commands/impl/discord-guild-user/discord-guild-user.reset.command";
import {
    DiscordGuildUserBySocialDiscordHandler
} from "../../../../application/queries/handlers/discord-guild-user/discord-guild-user.by-social-discord.handler";
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
