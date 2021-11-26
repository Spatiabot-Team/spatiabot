import {Module} from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {CommandHandlersDiscord} from "./application/commands/handlers";
import {EventHandlersDiscord} from "./application/events/handlers";
import {QueryHandlersDiscord} from "./application/queries/handlers";
import {DiscordService} from "./application/services/discord.service";
import {ServicesDiscord} from "./application/services";
import {TypeOrmModule} from "@nestjs/typeorm";
import {entitiesDiscord} from "./infrastructure/database/entities";
import {ControllersDiscord} from "./infrastructure/api/controllers";
import {repositoriesDiscord} from "./infrastructure/database/repositories";
import {DiscordToDbAdapter} from "./infrastructure/database/adapters/discord-to-db.adapter";
import {DiscordMessageAdapter} from "./infrastructure/adapter/discord-message.adapter";
import {LoggerModule} from "../LOGGER/logger.module";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([...entitiesDiscord, ...repositoriesDiscord]),
        LoggerModule,
    ],
    providers: [
        ...CommandHandlersDiscord,
        ...EventHandlersDiscord,
        ...QueryHandlersDiscord,
        ...ServicesDiscord,
        DiscordToDbAdapter,
        DiscordMessageAdapter
    ],
    exports: [DiscordService,DiscordMessageAdapter],
    controllers: [...ControllersDiscord]
})
export class DiscordModule {
}
