import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from 'src/observability/logging.interceptor';
import { AppLogger } from './app-logger/app-logger.service';

@Module({
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
        
    ],
    exports: [AppLogger]
})
export class ObservabilityModule {}
