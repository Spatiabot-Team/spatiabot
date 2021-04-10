import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Connection} from 'typeorm';
import {ConfigModule} from '@nestjs/config';
import {AppGateway} from './app.gateway';
import {UsersModule} from "./users/users.module";
import {BotModule} from "./bot/bot.module";
import {InitController} from "./app/controller/InitController";
import {AppController} from "./app/controller/app.controller";
import {FixtureService} from "./database/service/fixture.service";
import {User} from "./database/entity/user.entity";
import {UserRepository} from "./database/repository/user.repository";
import {RoleRepository} from "./database/repository/role.repository";
import {DiscordRoleRepository} from "./database/repository/discord-role.repository";
import {DiscordRole} from "./database/entity/discord-role.entity";
import {Role} from "./database/entity/role.entity";
import {SocialLocalRepository} from "./database/repository/social-local.repository";
import {SocialLocal} from "./database/entity/social-local.entity";
import {Scenario} from "./database/entity/scenario.entity";
import {ScenarioRepository} from "./database/repository/scenario.repository";
import {Etape} from "./database/entity/etape.entity";
import {EtapeRepository} from "./database/repository/etape.repository";
import {Reponse} from "./database/entity/reponse.entity";
import {ReponseRepository} from "./database/repository/reponse.repository";
import {ConsequencePossible} from "./database/entity/consequence-possible.entity";
import {ConsequencePossibleRepository} from "./database/repository/consequence-possible.repository";
import {Effet} from "./database/entity/effet.entity";
import {EffetRepository} from "./database/repository/effet.repository";
import {Joueur} from "./database/entity/joueur.entity";
import {JoueurRepository} from "./database/repository/joueur.repository";
import {Monde} from "./database/entity/monde.entity";
import {MondeRepository} from "./database/repository/monde.repository";
import {Partie} from "./database/entity/partie.entity";
import {PartieRepository} from "./database/repository/partie.repository";
import {Stat} from "./database/entity/stat.entity";
import {StatRepository} from "./database/repository/stat.repository";
import {ScenarioEffectue} from "./database/entity/scenario-effectue.entity";
import {ScenarioEffectueRepository} from "./database/repository/scenario-effectue.repository";

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
                "dist/entity/**/*.js"
            ],
            migrations: [
                "dist/migration/**/*.js"
            ],
            subscribers: [
                "dist/subscriber/**/*.js"
            ],
            synchronize: true,
            logging: false,
            autoLoadEntities: true
        }),
        TypeOrmModule.forFeature([
            User, UserRepository,
            Role, RoleRepository,
            DiscordRole, DiscordRoleRepository,
            SocialLocal, SocialLocalRepository,
            Scenario, ScenarioRepository,
            ScenarioEffectue, ScenarioEffectueRepository,
            Etape, EtapeRepository,
            Reponse, ReponseRepository,
            ConsequencePossible, ConsequencePossibleRepository,
            Effet, EffetRepository,
            Joueur, JoueurRepository,
            Monde, MondeRepository,
            Partie, PartieRepository,
            Stat, StatRepository,
        ]),
        UsersModule,
        BotModule
    ],
    controllers: [AppController,InitController],
    providers: [AppGateway, FixtureService],
})
export class AppModule {
    constructor(private connection: Connection) {
    }
}
