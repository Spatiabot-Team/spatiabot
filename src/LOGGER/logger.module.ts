import { Module } from '@nestjs/common';
import {WinstonLogger} from "./winston-logger";

@Module({
    providers : [WinstonLogger],
    exports : [WinstonLogger]
})
export class LoggerModule {}
