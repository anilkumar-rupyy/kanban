import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { stat } from "fs";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AppLogger } from "../app-logger/app-logger.service";

@Injectable()
export class HTTPLoggingInterceptor implements NestInterceptor {

    constructor(private readonly logger: AppLogger) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const {method, url} = req;

        const now = Date.now();
        return next
        .handle()
        .pipe(
            tap(()=> {
                const res = context.switchToHttp().getResponse();
                
                this.logger.info({
                    event: 'request_complete',
                    method,
                    path: url,
                    status: res.statusCode,
                    latencyMs: Date.now() - now,
                });
            }),
        );  
        
    }

}