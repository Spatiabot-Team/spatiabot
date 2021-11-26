import {CacheModule, Module} from '@nestjs/common';
import {CqrsModule} from '@nestjs/cqrs';
import {CommandHandlers} from "./application/commands/handlers";
import {EventHandlers} from "./application/events/handlers";
import {QueryHandlers} from "./application/queries/handlers";
import {Controllers} from "./infrastructure/api/controllers";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RoutingBot} from "./infrastructure/discord/routing-bot";
import {DiscordModule} from "../DISCORD/discord.module";
import {repositoriesSpatiabot} from "./infrastructure/database/repositories";
import {ActionsService} from "./infrastructure/discord/services/actions.service";
import {LoggerModule} from "../LOGGER/logger.module";
import {DiscordGuildService} from "./infrastructure/discord/services/discord-guild.service";
import {PartieService} from "./infrastructure/discord/services/partie.service";
import {UserModule} from "../USER/user.module";
import {CommandHandlersDiscordInfra} from "./infrastructure/discord/commands/handlers";
import {UserRepository} from "../USER/infrastructure/database/repositories/user.repository";

@Module({
    imports: [
        CacheModule.register(),
        CqrsModule,
        TypeOrmModule.forFeature([...repositoriesSpatiabot, UserRepository]),
        DiscordModule,
        LoggerModule,
        UserModule
    ],
    controllers: [...Controllers],
    providers: [
        ActionsService,
        RoutingBot,
        DiscordGuildService,
        PartieService,
        ...CommandHandlers,
        ...CommandHandlersDiscordInfra,
        ...EventHandlers,
        ...QueryHandlers,
    ],
})
export class SpatiabotModule {
}
