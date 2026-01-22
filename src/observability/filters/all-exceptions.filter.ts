import { ArgumentsHost, ExceptionFilter, HttpException, Injectable } from "@nestjs/common";
import { AppLogger } from "../logger/app-logger.service";


@Injectable()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly logger: AppLogger) {}

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest();
        const res = ctx.getResponse();

        const status = exception instanceof HttpException
                        ? exception.getStatus()
                        : 500;

        this.logger.error({
            event: 'unhandled_exception',
            method: req.method,
            path: req.url,
            status,
            err: exception instanceof Error ? exception.message : exception,
            stack: exception instanceof Error ? exception.stack : exception,
        });

        res.status(status).json({message: "Internal Server Error"})
    }
}