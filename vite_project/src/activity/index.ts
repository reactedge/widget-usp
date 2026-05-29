import { isActivityEnabled } from './activity.guard';
import {WIDGET_ID} from "../Config.ts";

type Level = 'info' | 'warn' | 'error';

export interface ActivityPayload {
    widget: string;
    phase: string;
    message: string;
    level: Level;
    data?: unknown;
    ts: number;
}

export function activity(
    phase: string,
    message: string,
    data?: unknown,
    level: Level = 'info'
) {
    const payload = {
        widget: `${WIDGET_ID}`,
        phase,
        message,
        level,
        data,
        ts: Date.now(),
    };

    if (isActivityEnabled()) {
        const prefix = `[${WIDGET_ID}] ${phase}`;

        if (level === 'error') {
            console.error(prefix, payload);
        } else if (level === 'warn') {
            console.warn(prefix, payload);
        } else {
            console.log(prefix, payload);
        }
    }

    dispatchActivityEvent(payload);
}

function dispatchActivityEvent(payload: ActivityPayload) {
    window.dispatchEvent(
        new CustomEvent('reactedge:activity', {
            detail: payload,
        })
    );
}