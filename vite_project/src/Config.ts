import {type UspSettings, type UspSlide} from "./components/Types.ts";
import {activity} from "./activity";
import {parseConfig} from "./ConfigSchema.ts";

export interface WidgetConfig {
    /**
     * Structured banner payload.
     * Shape is banner-owned and opaque to the platform.
     */
    readonly data: {
        slides: UspSlide[]
    }

    readonly settings: UspSettings;
}

export const WIDGET_ID = 'usp';

export function readWidgetConfig(
    rawConfig: unknown
): WidgetConfig {
    try {
        const contract = parseConfig(rawConfig);

        activity(
            'bootstrap',
            'Config resolved',
            contract
        );

        return Object.freeze(contract);

    } catch (e) {
        activity(
            'bootstrap',
            'Invalid widget contract',
            e instanceof Error? e.message: e,
            'error'
        );

        throw e;
    }
}