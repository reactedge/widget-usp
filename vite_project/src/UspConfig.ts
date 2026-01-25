import {type UspConfig, type UspSlide, defaultUspConfig} from "./components/Types.ts";

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
    const container = hostElement.closest('[data-usp]');
    if (!container) return null;

    const rawData = container.getAttribute("data-usp");

    if (!rawData) {
        return {
            slides: [],
            settings: defaultUspConfig,
        };
    }

    try {
        const parsed = JSON.parse(rawData);

        return Object.freeze({
            slides: parsed.slides ?? [],
            settings: parsed.settings ?? defaultUspConfig,
        });
    } catch {
        return {
            slides: [],
            settings: defaultUspConfig,
        };
    }
}
