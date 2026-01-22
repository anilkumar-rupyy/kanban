import { Injectable } from '@nestjs/common';

@Injectable()
export class AppLogger {
    info(payload: Record<string, any>) {
        console.log(JSON.stringify({
            level: "info",
            ...payload
        }));
    }

    warn(payload: Record<string, any>) {
        console.warn(JSON.stringify({
            level: "warn",
            ...payload,
        }));
    }

    error(payload: Record<string, any>) {
        console.error(JSON.stringify({
            level: "error",
            ...payload,
        }));
    }


}
