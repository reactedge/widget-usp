import {type UspSettings, type UspSlide} from "./components/Types.ts";
import {uspSchema} from "./widget-runtime/WidgetConfig/validation.ts";
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

export function readUspConfig(
    hostElement: HTMLElement
): UspWidgetConfig | null {
    const configScript = hostElement.querySelector<HTMLScriptElement>(
        'script[type="application/json"][data-config]'
    );

    if (!configScript) {
        throw new Error(`${WIDGET_ID} widget requires a <script data-config> block.`);
    }

    let raw: unknown;

    try {
        raw = JSON.parse(configScript.textContent || "{}");
    } catch {
        activity('config', "Invalid JSON", null, 'error');
        return null;
    }

    const parsed = uspSchema.safeParse(raw);

    if (!parsed.success) {
        activity('config', "contract invalid", { error: parsed.error });
        return null;
    }

    return Object.freeze(parsed.data);
}
