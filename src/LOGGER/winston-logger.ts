import {Injectable, LoggerService} from '@nestjs/common';
import {createLogger, format, Logger, LoggerOptions, transports} from "winston";
import {clc} from "@nestjs/common/utils/cli-colors.util";

/**
 * doc de winston : https://github.com/winstonjs/winston
 */
@Injectable()
export class WinstonLogger implements LoggerService {

    logger: Logger;

    constructor() {
        const d = new Date();
        const rotation = d.getFullYear() + '-' + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
        const options = {
            level: 'info',
            format: format.json(),
            defaultMeta: {service: 'user-service'},
            transports: [
                //
                // - Write all logs with level `error` and below to `error.log`
                // - Write all logs with level `info` and below to `combined.log`
                //
                new transports.File({filename: `logs/errors/${rotation}.error.log`, level: 'error'}),
                new transports.File({filename: `logs/combined/${rotation}.combined.log`}),
            ],
        };

        this.logger = createLogger(options);
    }

    public log(message: any, context?: string): any {
        // console.log('log ' + clc.red(message));
        if ('object' === typeof message) {
            const {message: msg, ...meta} = message;

            return this.logger.info(msg as string, {context, ...meta});
        }

        return this.logger.info(message, {context});
    }

    public error(message: any, trace?: string, context?: string): any {
        console.group(clc.red(message));

        if (message instanceof Error) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {message: msg, name, stack, ...meta} = message;
            console.log('Contexte : ' + clc.red(context));
            console.log('trace ' + clc.red(trace || message.stack));
            console.groupEnd()
            return this.logger.error(msg, {context, stack: [trace || message.stack], ...meta});
        }

        if ('object' === typeof message) {
            const {message: msg, ...meta} = message;
            console.log('Contexte : ' + clc.red(context));
            console.log('trace ' + clc.red(trace));
            console.groupEnd()
            return this.logger.error(msg as string, {context, stack: [trace], ...meta});
        }
        console.log('trace ' + clc.red(trace));
        console.groupEnd()
        return this.logger.error(message, {context, stack: [trace]});
    }

    public warn(message: any, context?: string): any {
        console.log('warn ' + clc.red(message));
        if ('object' === typeof message) {
            const {message: msg, ...meta} = message;

            return this.logger.warn(msg as string, {context, ...meta});
        }

        return this.logger.warn(message, {context});
    }

    public debug?(message: any, context?: string): any {
        console.log('debug ' + clc.red(message));
        if ('object' === typeof message) {
            const {message: msg, ...meta} = message;

            return this.logger.debug(msg as string, {context, ...meta});
        }

        return this.logger.debug(message, {context});
    }

    public verbose?(message: any, context?: string): any {
        console.log('verbose ' + clc.red(message));
        if ('object' === typeof message) {
            const {message: msg, ...meta} = message;

            return this.logger.verbose(msg as string, {context, ...meta});
        }

        return this.logger.verbose(message, {context});
    }
}
