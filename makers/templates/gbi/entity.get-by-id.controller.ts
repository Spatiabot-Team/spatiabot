import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Param, Request, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {###Entity###Interface} from "../../../../domain/interfaces/###entity-tiret###.interface";
import {###Entity###GetByIdHandler} from "../../../../application/queries/###entity-tiret###/###entity-tiret###.get-by-id.handler";
import {###Entity###GetByIdQuery} from "../../../../application/queries/###entity-tiret###/###entity-tiret###.get-by-id.query";
import {ParamId} from "../../../../../APP/dtos/param.id";

@ApiBearerAuth()
@ApiTags('###Entity###')
@Controller('###entity-tiret###s')
export class ###Entity###GetByIdController {

    constructor(
        private readonly ###entityCase###GetByIdHandler: ###Entity###GetByIdHandler,
    ) {}

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    async index(@Request() req, @Param() paramId: ParamId) : Promise<###Entity###Interface>{
        return this.###entityCase###GetByIdHandler.execute(new ###Entity###GetByIdQuery(paramId.id));
    }

}
