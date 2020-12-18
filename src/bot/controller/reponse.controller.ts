import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Request} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {InjectRepository} from "@nestjs/typeorm";
import {ReponseRepository} from "../../database/repository/reponse.repository";
import {ReponseDto} from "../../database/dto/reponse.dto";
import {Reponse} from "../../database/entity/reponse.entity";
import {ScenarioRepository} from "../../database/repository/scenario.repository";

// @ApiBearerAuth()
@ApiTags('Reponses')
@Controller('reponses')
export class ReponseController {

    constructor(
        @InjectRepository(ReponseRepository) private readonly reponseRepository: ReponseRepository,
        @InjectRepository(ScenarioRepository) private readonly scenarioRepository: ScenarioRepository
    ) {
    }

    @Get()
    // @UseGuards(JwtAuthGuard)
    // @Roles(RolesEnum.ADMIN)
    async index(@Request() req) {
        return this.reponseRepository.find();
    }

    @Get('/:id')
    public async getReponse(@Param("id") id: string): Promise<Reponse | undefined> {
        return this.reponseRepository.findOne(id);
    };

    @Post()
    async post(@Body() createReponseDto: ReponseDto) {

        if (createReponseDto.titre === undefined || createReponseDto.titre === null) {
            return {"error": "The key can't be null"};
        }

        const alreadyExist = await this.reponseRepository.findOne({
            "libelle": createReponseDto.libelle,
            "etape": {"id": createReponseDto.etape.id}
        });

        if (alreadyExist !== undefined) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Ce reponse existe déjà',
            }, HttpStatus.FORBIDDEN);
        }

        return this.reponseRepository.save(createReponseDto);
    }

    @Put(':id')
    // @UseGuards(JwtAuthGuard)
    // @Roles(RolesEnum.ADMIN)
    public async put(@Param('id') id: string, @Body() updateReponseDto: ReponseDto) {

        if (updateReponseDto.titre !== undefined && updateReponseDto.titre === null) {
            return {"error": "The key can't be null"};
        }
        await this.reponseRepository.update(id, {...updateReponseDto});
        return this.reponseRepository.findOne(id);
    }

    @Delete('/:id')
    async remove(@Param('id') id: string) {
        return this.reponseRepository.delete(id);
    }
}
