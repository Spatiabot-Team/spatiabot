import {CacheModule, Module} from '@nestjs/common';
import {CqrsModule} from '@nestjs/cqrs';
import {CommandHandlers} from "./application/commands/handlers";
import {QueryHandlers} from "./application/services";
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
import {EventHandlers} from "./application/events/handlers";
import {Validations} from "./application/validations";
import {CRONS} from "./infrastructure/cron";
import {MessageEmbedEtapeService} from "./infrastructure/discord/services/message/message.embed-etape.service";
import {ActionsDmService} from "./infrastructure/discord/services/actions-dm.service";
import {RandomItemByPoidsService} from "./domain/services/random-item-by-poids.service";

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
        ActionsDmService,
        RoutingBot,
        DiscordGuildService,
        PartieService,
        MessageEmbedEtapeService,
        RandomItemByPoidsService,
        ...CommandHandlers,
        ...CommandHandlersDiscordInfra,
        ...EventHandlers,
        ...QueryHandlers,
        ...Validations,
        ...CRONS
    ],
})
export class SpatiabotModule {
}
