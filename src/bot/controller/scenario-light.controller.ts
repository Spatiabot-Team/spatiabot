import {Controller, Get} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {InjectRepository} from "@nestjs/typeorm";
import {ScenarioRepository} from "../core/repository/scenario.repository";

// @ApiBearerAuth()
@ApiTags('ScenariosLight')
@Controller('scenarios-light')
export class ScenarioLightController {

    constructor(
        @InjectRepository(ScenarioRepository) private readonly scenarioRepository: ScenarioRepository
    ) {
    }
    @Get("")
    async getAll() {
        return await this.scenarioRepository.getAllLights();
    }
}
