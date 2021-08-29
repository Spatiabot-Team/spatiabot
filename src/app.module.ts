import {Module} from '@nestjs/common';
import {Connection} from 'typeorm';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SpatiabotModule} from "./spatiabot/spatiabot.module";
import {DiscordModule} from "./discord/discord.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE_NAME,
            entities: [
                "dist/**/*.entity{.ts,.js}",
                "dist/**/*.entity{.ts,.js}",
            ],
            // migrations: [
            //     "dist/migration/**/*.js"
            // ],
            // subscribers: [
            //     "dist/subscriber/**/*.js"
            // ],
            cache: true,
            synchronize: true,
            logging: false,
            autoLoadEntities: true
        }),
        //
        // TypeOrmModule.forFeature([
        //     UserRepository,
        //     RoleRepository,
        //     SocialLocalRepository
        // ]),
        // UsersModule,
        DiscordModule,
        // BotModule,
        SpatiabotModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
    constructor(private connection: Connection) {
    }
}
