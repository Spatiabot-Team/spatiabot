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
    DiscordGuildFindOrCreateCommand
} from "../../../../application/commands/impl/discord-guild/discord-guild.find-or-create.command";
import {
    DiscordGuildUserResetCommand
} from "../../../../application/commands/impl/discord-guild-user/discord-guild-user.reset.command";

@ApiTags('DiscordGuild')
@Controller('discord-guilds')
export class DiscordGuildSyncByConnectedUserController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly discordApi: DiscordApi
    ) {
    }

    @Get('sync-by-connected-user')
    @UseGuards(JwtAuthGuard)
    async index(@Request() req) {
        try {

            if (!req.user.socialDiscord) {
                return {success: false, message: 'Connexion discord recquise'};
            }

            // On va chercher dans l'api discord les guildes auxquelles le user est présent
            const discordGuilds = await this.discordApi.getInfosUser(req.user.socialDiscord.accessToken);

            // Afin de synchroniser, le plus simple est d'abord de reset tous les liens du user pour recréer
            await this.commandBus.execute(new DiscordGuildUserResetCommand(req.user.socialDiscord.id))

            // On créer les liens et éventuellement les guilds que l'on a pas encore

            await Promise.all(discordGuilds.map(async d => {
                let discordGuildUser = DiscordGuildApiToEntityAdapter.adaptToDiscordGuildUser(d, req.user.socialDiscord.id);
                discordGuildUser.discordGuild = await this.commandBus.execute(new DiscordGuildFindOrCreateCommand(discordGuildUser.discordGuild));
                return this.commandBus.execute(new DiscordGuildUserCreateCommand(discordGuildUser));
            }));

            return [];

        } catch (e: any) {
            console.error('DiscordGuildSyncByConnectedUserController error : ', e);
        }
    }

}
