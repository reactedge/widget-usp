import {type UspSettings, type UspSlide} from "./components/Types.ts";
import {activity} from "./activity";
import {WIDGET_ID} from "./mountWidget.tsx";

export interface UspWidgetConfig {
    /**
     * Structured banner payload.
     * Shape is banner-owned and opaque to the platform.
     */
    readonly data: {
        slides: UspSlide[]
    }

    readonly settings: UspSettings;
}

export function readWidgetConfig(
    rawConfig: UspWidgetConfig
): UspWidgetConfig {
    let contract = rawConfig
    if (contract === null) {
        contract = extractConfig() as UspWidgetConfig
    }

    activity('bootstrap', 'Config resolved', contract);

    return Object.freeze(contract);
}

export function extractConfig() {
    const configScript = document.querySelector<HTMLScriptElement>(
        `script[type="application/json"][${WIDGET_ID}-data-config]`
    );

    if (!configScript?.textContent) {
        throw new Error(`[${WIDGET_ID}] requires a <script type="application/json" data-config> block.`);
    }

    let parsed: unknown;
    try {
        parsed = JSON.parse(configScript.textContent);
    } catch {
        throw new Error(`[${WIDGET_ID}] invalid JSON inside <script data-config>.`);
    }

    return Object.freeze(parsed);
}