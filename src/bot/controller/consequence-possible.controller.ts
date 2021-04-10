import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Request} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {InjectRepository} from "@nestjs/typeorm";
import {ConsequencePossibleRepository} from "../../database/repository/consequence-possible.repository";
import {ConsequencePossible} from "../../database/entity/consequence-possible.entity";
import {ConsequencePossibleDto} from "../../database/dto/consequence-possible.dto";

// @ApiBearerAuth()
@ApiTags('ConsequencePossible')
@Controller('consequence-possibles')
export class ConsequencePossibleController {

    constructor(
        @InjectRepository(ConsequencePossibleRepository) private readonly consequencePossibleRepository: ConsequencePossibleRepository,
    ) {
    }

    @Get()
    // @UseGuards(JwtAuthGuard)
    // @Roles(RolesEnum.ADMIN)
    async index(@Request() req) {
        return this.consequencePossibleRepository.find();
    }

    @Get('/:id')
    public async getConsequencePossible(@Param("id") id: string): Promise<ConsequencePossible | undefined> {
        return this.consequencePossibleRepository.findOne(id);
    };

    @Post()
    async post(@Body() createConsequencePossibleDto: ConsequencePossibleDto) {
        return this.consequencePossibleRepository.save(createConsequencePossibleDto);
    }

    @Put(':id')
    // @UseGuards(JwtAuthGuard)
    // @Roles(RolesEnum.ADMIN)
    public async put(@Param('id') id: string, @Body() updateConsequencePossibleDto: ConsequencePossibleDto) {
        return await this.consequencePossibleRepository.save({...updateConsequencePossibleDto, id});
    }

    @Delete('/:id')
    async remove(@Param('id') id: string) {
        return this.consequencePossibleRepository.delete(id);
    }
}
