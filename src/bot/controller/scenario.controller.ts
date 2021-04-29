import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Request} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {InjectRepository} from "@nestjs/typeorm";
import {ScenarioRepository} from "../core/repository/scenario.repository";
import {Scenario} from "../core/entity/scenario.entity";
import {ScenarioDto} from "../core/dto/scenario.dto";

// @ApiBearerAuth()
@ApiTags('Scenarios')
@Controller('scenarios')
export class ScenarioController {

    constructor(
        @InjectRepository(ScenarioRepository) private readonly scenarioRepository: ScenarioRepository
    ) {
    }

    @Get()
    // @UseGuards(JwtAuthGuard)
    // @Roles(RolesEnum.ADMIN)
    async index(@Request() req) {
        return this.scenarioRepository.find();
    }

    @Get('/:id')
    public async getScenario(@Param("id") id: string): Promise<Scenario | undefined> {
        return this.scenarioRepository.findOne(id);
    };

    @Post()
    async post(@Body() createScenarioDto: ScenarioDto) {

        if (createScenarioDto.titre === undefined || createScenarioDto.titre === null) {
            return {"error": "The key can't be null"};
        }

        const alreadyExist = await this.scenarioRepository.findOne({
            "titre": createScenarioDto.titre,
            "monde": {"id": createScenarioDto.monde.id}
        });

        if (alreadyExist !== undefined) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Ce scenario existe déjà',
            }, HttpStatus.FORBIDDEN);
        }

        return this.scenarioRepository.save(createScenarioDto);
    }

    @Put(':id')
    // @UseGuards(JwtAuthGuard)
    // @Roles(RolesEnum.ADMIN)
    public async put(@Param('id') id: string, @Body() updateScenarioDto: ScenarioDto) {

        if (updateScenarioDto.titre !== undefined && updateScenarioDto.titre === null) {
            return {"error": "The key can't be null"};
        }
        await this.scenarioRepository.update(id, updateScenarioDto)
        return this.scenarioRepository.findOne(id);
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.scenarioRepository.delete(id);
    }
}
