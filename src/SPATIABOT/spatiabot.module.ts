import {CacheModule, Module} from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {repositoriesSpatiabot} from "./infrastructure/database/repositories";
import {UserRepository} from "../USER/infrastructure/database/repositories/user.repository";
import {DiscordModule} from "../DISCORD/discord.module";
import {LoggerModule} from "../LOGGER/logger.module";
import {UserModule} from "../USER/user.module";
import {Controllers} from "./infrastructure/api/controllers";
import {RandomItemByPoidsService} from "./domain/services/random-item-by-poids.service";
import {CommandHandlers} from "./application/commands";
import {EventHandlers} from "./application/events";
import {QueryHandlers} from "./application/queries";
import {Validations} from "./application/validations";

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
        // ActionsService,
        // ActionsDmService,
        // RoutingBot,
        // DiscordGuildService,
        // PartieService,
        // MessageEmbedEtapeService,
        RandomItemByPoidsService,
        ...CommandHandlers,
        // ...CommandHandlersDiscordInfra,
        ...EventHandlers,
        ...QueryHandlers,
        ...Validations,
        // ...CRONS
    ],
})
export class SpatiabotModule {
}

