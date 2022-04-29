import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Param, Request, UseGuards} from "@nestjs/common";
import {QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {###Entity###Interface} from "../../../../domain/interfaces/###entity-tiret###.interface";
import {###Entity###GetByIdQuery} from "../../../../application/services/###entity-tiret###/###entity-tiret###.get-by-id.query";
import {ParamId} from "../../dtos/generic/param.id";

@ApiBearerAuth()
@ApiTags('###Entity###')
@Controller('###entity-tiret###s')
export class ###Entity###GetByIdController {

    constructor(
        private readonly queryBus: QueryBus,
    ) {}

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    async index(@Request() req, @Param() paramId: ParamId) : Promise<###Entity###Interface>{
        return this.queryBus.execute(new ###Entity###GetByIdQuery(paramId.id));
    }

}
