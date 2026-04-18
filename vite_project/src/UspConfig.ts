import {type UspSettings, type UspSlide} from "./components/Types.ts";
import {activity} from "./activity";
import {loadContract} from "./widget-runtime/lib/contractLoader.ts";
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

export async function readWidgetConfig(
    hostElement: HTMLElement
): Promise<UspWidgetConfig | null> {
    let contract = null
    try {
        contract = await loadContract(hostElement);
    } catch (e) {
        contract = extractConfig()
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