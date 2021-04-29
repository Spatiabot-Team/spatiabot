import {Body, Controller, Get, Param, Post, Put, Request, UseGuards} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {MondeRepository} from "../core/repository/monde.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Monde} from "../core/entity/monde.entity";
import {JwtAuthGuard} from "../../users/auth/jwt-auth.guard";
import {RolesEnum} from "../../users/core/enum/roles.enum";
import {Roles} from "../../users/auth/roles.decorator";
import {UserRepository} from "../../users/core/repository/user.repository";
import {In} from "typeorm";
import {ScenarioRepository} from "../core/repository/scenario.repository";

// @ApiBearerAuth()
@ApiTags('Monde')
@Controller('mondes')
export class MondeController {

    constructor(
        @InjectRepository(MondeRepository) private readonly mondeRepository: MondeRepository,
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        @InjectRepository(ScenarioRepository) private readonly scenarioRepository: ScenarioRepository,
    ) {
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req: any) {
        return this.mondeRepository.findByUser(req.user);
    }

    // @Get()
    // // @UseGuards(JwtAuthGuard)
    // // @Roles(RolesEnum.ADMIN)
    // async index(@Request() req) {
    //     return this.mondeRepository.find();
    // }
    //
    // // ATTENTION : il faut surtout que cette route soit avant celle de @Get('/:id') sinon :id prendra tout !!
    // @Get('/:id/scenarios')
    // public async getScenarios(@Param("id") id: string): Promise<any[] | undefined> {
    //     return this.scenarioRepository.findAllLightByMonde(id);
    // };
    //
    @Get('/:id/scenarios-light')
    public async getScenariosLight(@Param("id") id: string): Promise<any[] | undefined> {
        return await this.scenarioRepository.findAllLightByMonde(id);
    };
    //
    @Get('/:id')
    public async getMonde(@Param("id") id: string): Promise<Monde | undefined> {
        const monde = await this.mondeRepository.findOne(id);
        // monde.scenarios = await this.scenarioRepository.findAllLightByMonde(monde.id)
        return monde;
    };

    //
    @Post()
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async post(@Request() req, @Body() monde: Monde) {

        const alreadyExist = await this.mondeRepository.findOne({"code": monde.code});

        if (alreadyExist) {
            return {"error": "Ce monde existe déjà"};
        }

        const user = await this.userRepository.findOne(req.user.id);
        monde.auteurs = [user];

        return this.mondeRepository.save(monde);
    }

    @Put(':id/auteurs')
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    public async put(@Request() req, @Param('id') id: string, @Body() query: { auteurs: string[] }) {
        const monde = await this.mondeRepository.findOne(id);

        if (!monde) {
            return {"error": "Ce monde n'existe pas"};
        }

        if (!monde.auteurs.find(auteur => auteur.id == req.user.id)) {
            return {"error": "Vous nêtes pas auteur de ce monde donc vous ne pouvez pas en ajouter d'autres"};
        }

        monde.auteurs = await this.userRepository.find({
            id: In(query.auteurs.concat(monde.auteurs.map(a => a.id)))
        });

        //@todo refacto l'hydratation pour utiliser le moyen automatique
        const newMonde = await this.mondeRepository.save({...monde, id});
        return {
            ...newMonde,
            auteurs: newMonde.auteurs.map(a => ({id: a.id, username: a.username}))
        };
        // if (mondeDto.titre !== undefined && mondeDto.titre === null) {
        //     return {"error": "The key can't be null"};
        // }
        // return await this.mondeRepository.save({...mondeDto, id});
    }

    //
    // @Put(':id')
    // // @UseGuards(JwtAuthGuard)
    // // @Roles(RolesEnum.ADMIN)
    // public async put(@Param('id') id: string, @Body() monde: Monde) {
    //     return {'to': 'do'};
    //     // if (mondeDto.titre !== undefined && mondeDto.titre === null) {
    //     //     return {"error": "The key can't be null"};
    //     // }
    //     // return await this.mondeRepository.save({...mondeDto, id});
    // }
    //
    // @Delete('/:id')
    // remove(@Param('id') id: string) {
    //     return this.mondeRepository.delete(id);
    // }
}
