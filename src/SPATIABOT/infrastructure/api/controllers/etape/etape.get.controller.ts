import {ApiTags} from "@nestjs/swagger";
import {Controller, Get, Request} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {EtapeGetHandler} from "../../../../application/services/etape/etape.get.handler";
import {EtapeGetQuery} from "../../../../application/services/etape/etape.get.query";

@ApiTags('Etape')
@Controller('Etapes')
export class EtapeGetController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly etapeGetHandler: EtapeGetHandler,
    ) {}

    @Get()
    async index(@Request() req) {
        return this.etapeGetHandler.execute(new EtapeGetQuery());
    }

}
