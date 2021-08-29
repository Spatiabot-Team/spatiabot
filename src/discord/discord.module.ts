import {HttpModule, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from "../users/core/entity/user.entity";
import {UserRepository} from "../users/core/repository/user.repository";
import {Role} from "../users/core/entity/role.entity";
import {RoleRepository} from "../users/core/repository/role.repository";
import {SocialLocal} from "../users/core/entity/social-local.entity";
import {SocialLocalRepository} from "../users/core/repository/social-local.repository";
import {SyncUserDiscordGuildController} from "./controller/sync-user-discord-guild.controller";
import {DiscordGuild} from "./core/entity/discord-guild.entity";
import {DiscordGuildRepository} from "./core/repository/discord-guild.repository";
import {DiscordApi} from "./core/service/discord-api.service";
import {SocialDiscordRepository} from "../users/core/repository/social-discord.repository";
import {SocialDiscord} from "../users/core/entity/social-discord.entity";
import {DiscordGuildUserRepository} from "./core/repository/discord-guild-user.repository";
import {DiscordGuildUser} from "./core/entity/discord-guild-user.entity";
import {DiscordCdn} from "./core/service/discord-cdn.service";
import {DiscordGuildService} from "./core/service/discord-guild.service";
import {DiscordGuildsController} from "./controller/discord-guild.controller";
import {DiscordService} from "./core/service/discord.service";
import {EmbedService} from "./core/service/embed.service";

@Module({
    providers: [
        DiscordApi, DiscordCdn, DiscordGuildService,EmbedService,DiscordService
    ],
    imports: [
        HttpModule.registerAsync({
            useFactory: () => ({
                timeout: 5000,
                maxRedirects: 5,
            }),
        }),
        TypeOrmModule.forFeature([
            UserRepository,
            RoleRepository,
            SocialDiscordRepository,
            DiscordGuildRepository,
            DiscordGuildRepository,
            DiscordGuildUserRepository,
            SocialLocalRepository
        ])
    ],
    controllers: [
        DiscordGuildsController,
        SyncUserDiscordGuildController
    ]
})
export class DiscordModule {
}
