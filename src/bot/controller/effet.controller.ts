import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Request} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {InjectRepository} from "@nestjs/typeorm";
import {EffetRepository} from "../../database/repository/effet.repository";
import {EffetDto} from "../../database/dto/effet.dto";
import {Effet} from "../../database/entity/effet.entity";
import {ScenarioRepository} from "../../database/repository/scenario.repository";

// @ApiBearerAuth()
@ApiTags('Effets')
@Controller('effets')
export class EffetController {

    constructor(
        @InjectRepository(EffetRepository) private readonly effetRepository: EffetRepository,
        @InjectRepository(ScenarioRepository) private readonly scenarioRepository: ScenarioRepository
    ) {
    }

    @Get()
    // @UseGuards(JwtAuthGuard)
    // @Roles(RolesEnum.ADMIN)
    async index(@Request() req) {
        return this.effetRepository.find();
    }

    @Get('/:id')
    public async getEffet(@Param("id") id: string): Promise<Effet | undefined> {
        return this.effetRepository.findOne(id);
    };

    @Post()
    async post(@Body() createEffetDto: EffetDto) {
        return this.effetRepository.save(createEffetDto);
    }

    @Put(':id')
    // @UseGuards(JwtAuthGuard)
    // @Roles(RolesEnum.ADMIN)
    public async put(@Param('id') id: string, @Body() updateEffetDto: EffetDto) {
        await this.effetRepository.update(id,{...updateEffetDto});
        return this.effetRepository.findOne(id);
    }

    @Delete('/:id')
    async remove(@Param('id') id: string) {
        return this.effetRepository.delete(id);
    }
}
