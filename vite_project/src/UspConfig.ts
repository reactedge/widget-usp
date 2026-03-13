import {type UspSettings, type UspSlide} from "./components/Types.ts";
import {activity} from "./activity";
import {loadContract} from "./widget-runtime/lib/contractLoader.ts";

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
    const contract = await loadContract(hostElement);

    activity('bootstrap', 'Config resolved', contract);

    return Object.freeze(contract);
}
