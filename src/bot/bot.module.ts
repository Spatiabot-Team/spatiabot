import {Module} from '@nestjs/common';
import {MondeController} from "./controller/monde.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Monde} from "./core/entity/monde.entity";
import {MondeRepository} from "./core/repository/monde.repository";
import {User} from "../users/core/entity/user.entity";
import {UserRepository} from "../users/core/repository/user.repository";
import {RouteListener} from "./listeners/route.listener";
import {DiscordService} from "../discord/core/service/discord.service";
import {PartieService} from "./core/service/partie.service";
import {AdminController} from "./controller-bot/admin.controller";
import {VaisseauController} from "./controller-bot/vaisseau.controller";
import {BotController} from "./controller-bot/bot.controller";
import {EmbedService} from "../discord/core/service/embed.service";
import {DiscordGuildRepository} from "../discord/core/repository/discord-guild.repository";
import {DiscordGuild} from "../discord/core/entity/discord-guild.entity";
import {DiscordUserService} from "../users/discord/discord-user.service";
import {UsersService} from "../users/local/users.service";
import {PartieRepository} from "./core/repository/partie.repository";
import {ScenarioRepository} from "./core/repository/scenario.repository";
import {EtapeRepository} from "./core/repository/etape.repository";
import {ScenarioEffectueRepository} from "./core/repository/scenario-effectue.repository";
import {Partie} from "./core/entity/partie.entity";
import {Scenario} from "./core/entity/scenario.entity";
import {ScenarioEffectue} from "./core/entity/scenario-effectue.entity";
import {Etape} from "./core/entity/etape.entity";
import {EffetRepository} from "./core/repository/effet.repository";
import {Effet} from "./core/entity/effet.entity";
import {ConsequencePossible} from "./core/entity/consequence-possible.entity";
import {ConsequencePossibleRepository} from "./core/repository/consequence-possible.repository";
import {Joueur} from "./core/entity/joueur.entity";
import {JoueurRepository} from "./core/repository/joueur.repository";
import {Reponse} from "./core/entity/reponse.entity";
import {ReponseRepository} from "./core/repository/reponse.repository";
import {Stat} from "./core/entity/stat.entity";
import {StatRepository} from "./core/repository/stat.repository";
import {Unite} from "./core/entity/unite.entity";
import {UniteRepository} from "./core/repository/unite.repository";
import {DiscordCdn} from "../discord/core/service/discord-cdn.service";
import {SocialDiscordRepository} from 'src/users/core/repository/social-discord.repository';
import {SocialDiscord} from "../users/core/entity/social-discord.entity";
import {Role} from "../users/core/entity/role.entity";
import {RoleRepository} from "../users/core/repository/role.repository";
import {EncrDecrService} from "../users/local/enc-decr.service";
import {UsersModule} from "../users/users.module";
import {PartieController} from "./controller/partie.controller";
import {ScenarioController} from "./controller/scenario.controller";
import {ScenarioLightController} from "./controller/scenario-light.controller";
import {EtapeController} from "./controller/etape.controller";
import {EffetController} from "./controller/effet.controller";
import {ReponseController} from "./controller/reponse.controller";
import {ConsequencePossibleController} from "./controller/consequence-possible.controller";
import {InitmondeController} from "./controller/InitmondeController";
import {FixtureService} from "./core/service/fixture.service";
import {EmbedEtapeService} from "./core/service/embed-etape.service";

@Module({
    controllers: [
        PartieController,
        MondeController,
        ScenarioController,
        ScenarioLightController,
        EtapeController,
        EffetController,
        ReponseController,
        ConsequencePossibleController,
        InitmondeController
    ],
    imports: [
        UsersModule,
        TypeOrmModule.forFeature([
            ConsequencePossible, ConsequencePossibleRepository,
            Effet, EffetRepository,
            Etape, EtapeRepository,
            Joueur, JoueurRepository,
            Monde, MondeRepository,
            Partie, PartieRepository,
            Reponse, ReponseRepository,
            Scenario, ScenarioRepository,
            ScenarioEffectue, ScenarioEffectueRepository,
            Stat, StatRepository,
            Unite, UniteRepository,
            User, UserRepository,
            DiscordGuild, DiscordGuildRepository,
            SocialDiscord, SocialDiscordRepository,
            Role, RoleRepository
        ])
    ],
    providers: [
        DiscordService,
        EncrDecrService,
        DiscordCdn,
        RouteListener,
        PartieService,
        EmbedService,
        AdminController,
        VaisseauController,
        BotController,
        FixtureService,
        EmbedEtapeService
    ]
})
export class BotModule {
}
