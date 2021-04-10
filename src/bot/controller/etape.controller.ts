import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Request} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {InjectRepository} from "@nestjs/typeorm";
import {EtapeRepository} from "../../database/repository/etape.repository";
import {EtapeDto} from "../../database/dto/etape.dto";
import {Etape} from "../../database/entity/etape.entity";
import {ScenarioRepository} from "../../database/repository/scenario.repository";

// @ApiBearerAuth()
@ApiTags('Etapes')
@Controller('etapes')
export class EtapeController {

    constructor(
        @InjectRepository(EtapeRepository) private readonly etapeRepository: EtapeRepository,
        @InjectRepository(ScenarioRepository) private readonly scenarioRepository: ScenarioRepository
    ) {
    }

    @Get()
    // @UseGuards(JwtAuthGuard)
    // @Roles(RolesEnum.ADMIN)
    async index(@Request() req) {
        return this.etapeRepository.find();
    }

    @Get('/:id')
    public async getEtape(@Param("id") id: string): Promise<Etape | undefined> {
        return this.etapeRepository.findOne(id);
    };

    @Post()
    async post(@Body() createEtapeDto: EtapeDto) {

        if (createEtapeDto.titre === undefined || createEtapeDto.titre === null) {
            return {"error": "The key can't be null"};
        }

        const alreadyExist = await this.etapeRepository.findOne({
            "titre": createEtapeDto.titre,
            "scenario": {"id": createEtapeDto.scenario.id}
        });

        if (alreadyExist !== undefined) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Ce etape existe déjà',
            }, HttpStatus.FORBIDDEN);
        }

        return this.etapeRepository.save(createEtapeDto);
    }

    @Put(':id')
    // @UseGuards(JwtAuthGuard)
    // @Roles(RolesEnum.ADMIN)
    public async put(@Param('id') id: string, @Body() updateEtapeDto: EtapeDto) {

        if (updateEtapeDto.titre !== undefined && updateEtapeDto.titre === null) {
            return {"error": "The key can't be null"};
        }
        delete updateEtapeDto.effets;
        delete updateEtapeDto.reponses;
        await this.etapeRepository.update(id,updateEtapeDto)
        return await this.etapeRepository.findOne(id);
    }

    @Delete('/:id')
    async remove(@Param('id') id: string) {
        const scenario = await this.scenarioRepository.findOne({premiereEtape: id});
        if (scenario) {
            await this.scenarioRepository.save({premiereEtape: null, id: scenario.id});
        }
        return this.etapeRepository.delete(id);
    }
}
