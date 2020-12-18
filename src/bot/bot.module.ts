import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from "../users/users.module";
import {Scenario} from "../database/entity/scenario.entity";
import {ScenarioRepository} from "../database/repository/scenario.repository";
import {Etape} from "../database/entity/etape.entity";
import {EtapeRepository} from "../database/repository/etape.repository";
import {Reponse} from "../database/entity/reponse.entity";
import {ReponseRepository} from "../database/repository/reponse.repository";
import {ConsequencePossible} from "../database/entity/consequence-possible.entity";
import {ConsequencePossibleRepository} from "../database/repository/consequence-possible.repository";
import {Effet} from "../database/entity/effet.entity";
import {EffetRepository} from "../database/repository/effet.repository";
import {Joueur} from "../database/entity/joueur.entity";
import {JoueurRepository} from "../database/repository/joueur.repository";
import {Monde} from "../database/entity/monde.entity";
import {MondeRepository} from "../database/repository/monde.repository";
import {Partie} from "../database/entity/partie.entity";
import {PartieRepository} from "../database/repository/partie.repository";
import {Stat} from "../database/entity/stat.entity";
import {StatRepository} from "../database/repository/stat.repository";
import {Unite} from "../database/entity/unite.entity";
import {UniteRepository} from "../database/repository/unite.repository";
import {ScenarioController} from "./controller/scenario.controller";
import {ScenarioLightController} from "./controller/scenario-light.controller";
import {RouteListener} from "./listeners/route.listener";
import {DiscordService} from "./service/discord.service";
import {EmbedService} from "./service/embed.service";
import {VaisseauController} from "./controller-bot/vaisseau.controller";
import {BotController} from "./controller-bot/bot.controller";
import {UserRepository} from "../database/repository/user.repository";
import {User} from "../database/entity/user.entity";
import {MondeController} from "./controller/monde.controller";
import {Role} from "../database/entity/role.entity";
import {RoleRepository} from "../database/repository/role.repository";
import {EtapeController} from "./controller/etape.controller";
import {ReponseController} from "./controller/reponse.controller";
import {ConsequencePossibleController} from "./controller/consequence-possible.controller";
import {AdminController} from "./controller-bot/admin.controller";
import {PartieController} from "./controller/partie.controller";
import {DiscordGuild} from "../database/entity/discord-guild.entity";
import {DiscordGuildRepository} from "../database/repository/discord-guild.repository";
import {EffetController} from "./controller/effet.controller";
import {PartieService} from "../database/service/partie.service";
import {ScenarioEffectue} from "../database/entity/scenario-effectue.entity";
import {ScenarioEffectueRepository} from "../database/repository/scenario-effectue.repository";

@Module({
    controllers: [
        PartieController,
        MondeController,
        ScenarioController,
        ScenarioLightController,
        EtapeController,
        EffetController,
        ReponseController,
        ConsequencePossibleController
    ],
    imports: [
        TypeOrmModule.forFeature([
            DiscordGuild, DiscordGuildRepository,
            Partie, PartieRepository,
            Scenario, ScenarioRepository,
            ScenarioEffectue, ScenarioEffectueRepository,
            Etape, EtapeRepository,
            Reponse, ReponseRepository,
            ConsequencePossible, ConsequencePossibleRepository,
            Effet, EffetRepository,
            Joueur, JoueurRepository,
            Monde, MondeRepository,
            Stat, StatRepository,
            Unite, UniteRepository,
            User, UserRepository,
            Role, RoleRepository
        ]),
        UsersModule
    ],
    providers: [
        EmbedService,
        DiscordService,
        PartieService,
        RouteListener,
        AdminController,
        BotController,
        VaisseauController,
    ]
})
export class BotModule {

}
