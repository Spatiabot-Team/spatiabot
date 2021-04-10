import {Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {InjectRepository} from "@nestjs/typeorm";
import {MondeRepository} from "../../database/repository/monde.repository";
import {Monde} from "../../database/entity/monde.entity";
import {JwtAuthGuard} from "../../users/auth/jwt-auth.guard";
import {RolesEnum} from "../../database/enums/roles.enum";
import {UserRepository} from "../../database/repository/user.repository";
import {Roles} from "../../users/auth/roles.decorator";
import {ScenarioRepository} from "../../database/repository/scenario.repository";

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
    // @UseGuards(JwtAuthGuard)
    // @Roles(RolesEnum.ADMIN)
    async index(@Request() req) {
        return this.mondeRepository.find();
    }

    // ATTENTION : il faut surtout que cette route soit avant celle de @Get('/:id') sinon :id prendra tout !!
    @Get('/:id/scenarios')
    public async getScenarios(@Param("id") id: string): Promise<any[] | undefined> {
        return this.scenarioRepository.findAllLightByMonde(id);
    };

    @Get('/:id/scenarios-light')
    public async getScenariosLight(@Param("id") id: string): Promise<any[] | undefined> {
        return this.scenarioRepository.findAllLightByMonde(id);
    };

    @Get('/:id')
    public async getMonde(@Param("id") id: string): Promise<Monde | undefined> {
        const monde = await this.mondeRepository.findOne(id);
        monde.scenarios = await this.scenarioRepository.findAllLightByMonde(monde.id)
        return monde;
    };

    @Post()
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async post(@Request() req, @Body() monde: Monde) {

        const alreadyExist = await this.mondeRepository.findOne({"code": monde.code});

        if (alreadyExist) {
            return {"error": "This monde already exist"};
        }

        const user = await this.userRepository.findOne(req.user.id);
        monde.auteurs = [user];

        return this.mondeRepository.save(monde);
    }

    @Put(':id')
    // @UseGuards(JwtAuthGuard)
    // @Roles(RolesEnum.ADMIN)
    public async put(@Param('id') id: string, @Body() monde: Monde) {
        return {'to': 'do'};
        // if (mondeDto.titre !== undefined && mondeDto.titre === null) {
        //     return {"error": "The key can't be null"};
        // }
        // return await this.mondeRepository.save({...mondeDto, id});
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.mondeRepository.delete(id);
    }
}
