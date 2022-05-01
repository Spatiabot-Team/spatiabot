import {CacheModule, Module} from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {QueryHandlers} from "./application/queries/handlers";
import {DiscordService} from "./application/services/discord.service";
import {ServicesDiscord} from "./application/services";
import {TypeOrmModule} from "@nestjs/typeorm";
import {entitiesDiscord} from "./infrastructure/database/entities";
import {ControllersDiscord} from "./infrastructure/api/controllers";
import {repositoriesDiscord} from "./infrastructure/database/repositories";
import {DiscordToDbAdapter} from "./infrastructure/database/adapters/discord-to-db.adapter";
import {DiscordMessageAdapter} from "./infrastructure/adapter/discord-message.adapter";
import {LoggerModule} from "../LOGGER/logger.module";
import {HttpModule} from "@nestjs/axios";
import {CommandHandlers} from "./application/commands/handlers";
import {EventHandlers} from "./application/events/handlers";
import {
    DiscordGuildFindByDiscordGuildIdService
} from "./application/services/discord-guild/discord-guild.find-by-discord-guild-id.service";
import {GetDiscordGuildHandler} from "./application/queries/handlers/get-discord-guild.handler";

@Module({
    imports: [
        CacheModule.register(),
        HttpModule,
        CqrsModule,
        TypeOrmModule.forFeature([...entitiesDiscord, ...repositoriesDiscord]),
        LoggerModule,
    ],
    providers: [
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
        ...ServicesDiscord,
        DiscordToDbAdapter,
        DiscordMessageAdapter
    ],
    exports: [DiscordService,DiscordMessageAdapter, DiscordGuildFindByDiscordGuildIdService, GetDiscordGuildHandler],
    controllers: [...ControllersDiscord]
})
export class DiscordModule {
}
