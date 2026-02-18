import {type UspConfig, type UspSlide, defaultUspConfig} from "./components/Types.ts";
import {WIDGET_ID} from "./UspWidgetWrapper.tsx";

export interface UspWidgetConfig {
    /**
     * Structured banner payload.
     * Shape is banner-owned and opaque to the platform.
     */
    readonly slides: UspSlide[]

    readonly settings: UspConfig;
}

export function readUspConfig(
    hostElement: HTMLElement
): UspWidgetConfig | null {
    const configScript = hostElement.querySelector<HTMLScriptElement>(
        'script[type="application/json"][data-config]'
    );

    if (!configScript) {
        throw new Error(`${WIDGET_ID} widget requires a <script data-config> block.`);
    }

    try {
        const parsed = JSON.parse(configScript.textContent || "{}");

        return Object.freeze({
            slides: parsed.data.slides ?? [],
            settings: parsed.settings ?? defaultUspConfig,
        });
    } catch {
        return {
            slides: [],
            settings: defaultUspConfig,
        };
    }
}
