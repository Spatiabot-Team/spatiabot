import {CacheModule, Module} from '@nestjs/common';
import {Connection} from 'typeorm';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SpatiabotModule} from "./SPATIABOT/spatiabot.module";
import {DiscordModule} from "./DISCORD/discord.module";
import {LoggerModule} from './LOGGER/logger.module';
import {UserModule} from "./USER/user.module";
import {ConfigModule} from "@nestjs/config";
import {FixturesController} from "./APP/controllers/fixtures.controller";
import {TerminusModule} from "@nestjs/terminus";
import { HealthController } from './HEALTH/health.controller';
import {HttpModule} from "@nestjs/axios";

@Module({
    imports: [
        HttpModule,
        TerminusModule,
        CacheModule.register(),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || ''),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE_NAME,
            entityPrefix: 'sp_',
            entities: [
                "dist/**/database/entities/*.entity{.ts,.js}"
            ],
            // migrations: [
            //     "dist/migration/**/*.js"
            // ],
            // subscribers: [
            //     "dist/subscriber/**/*.js"
            // ],
            cache: false,
            synchronize: true,
            //https://github.com/typeorm/typeorm/blob/master/docs/logging.md
            logging: ["error"],
            maxQueryExecutionTime: 1000, //This code will log all queries which run more then 1 second.
            logger: "file",
            autoLoadEntities: true,
        }),
        //
        // TypeOrmModule.forFeature([
        //     UserRepository,
        //     RoleRepository,
        //     SocialLocalRepository
        // ]),
        UserModule,
        DiscordModule,
        // BotModule,
        SpatiabotModule,
        LoggerModule,
    ],
    controllers: [FixturesController, HealthController],
    providers: [],
    exports: []
})
export class AppModule {
    constructor(private connection: Connection) {
    }
}
