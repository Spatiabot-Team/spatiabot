import {Module} from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {CommandHandlersUser} from "./application/commands/handlers";
import {EventHandlersUser} from "./application/events/handlers";
import {QueryHandlersUser} from "./application/queries/handlers";
import {ServicesUser} from "./application/services";
import {TypeOrmModule} from "@nestjs/typeorm";
import {entitiesUser} from "./infrastructure/database/entities";
import {SocialDiscordService} from "./application/services/social-discord.service";
import {repositoriesUser} from "./infrastructure/database/repositories";
import {LoggerModule} from "../LOGGER/logger.module";
import {ControllersUser} from "./infrastructure/api/controllers";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {Security} from "./infrastructure/api/security";
import {ConfigService} from "@nestjs/config";
import {UsersFixtures} from "./infrastructure/database/fixtures/users.fixtures";

@Module({
    imports: [
        CqrsModule,
        LoggerModule,
        TypeOrmModule.forFeature([...entitiesUser, ...repositoriesUser]),
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.registerAsync({
            useFactory: (config: ConfigService) => {
                return {
                    secret: config.get<string>('JWT_KEY_SECRET'),
                    signOptions: {
                        expiresIn: config.get<string | number>('JWT_EXPIRES_IN') || '600s',
                    },
                };
            },
            inject: [ConfigService],
        })
    ],
    providers: [
        ...CommandHandlersUser,
        ...EventHandlersUser,
        ...QueryHandlersUser,
        ...Security,
        ...ServicesUser,
        UsersFixtures
    ],
    exports: [SocialDiscordService, UsersFixtures],
    controllers: [...ControllersUser]
})
export class UserModule {
}
