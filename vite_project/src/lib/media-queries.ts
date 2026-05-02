import type { UspModeValue} from "../components/Types.ts";
import type {UspWidgetConfig} from "../UspConfig.ts";

export function resolveMode(width: number, config: UspWidgetConfig): UspModeValue {
    if (width <= 480) return config.settings.mode.mobile;
    if (width <= 768) return config.settings.mode.tablet;
    return config.settings.mode.desktop;
}