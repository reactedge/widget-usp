import {useMemo} from "react";
import {readUspConfig, type UspWidgetConfig} from "../UspConfig.ts";
import {activity} from "../activity";

export function useWidgetConfig(
    host: HTMLElement
): UspWidgetConfig | null {
    return useMemo(() => {
        const baseConfig = readUspConfig(host);
        if (!baseConfig) {
            activity('bootstrap', 'Widget is not correctly configured', null, 'error');
            return null;
        }

        activity('bootstrap', 'Widget config', baseConfig);

        return baseConfig
    }, [host]);
}



