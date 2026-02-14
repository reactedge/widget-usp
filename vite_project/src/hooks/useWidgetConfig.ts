import {useMemo} from "react";
import {readUspConfig, type UspWidgetConfig} from "../UspConfig.ts";
import {activity} from "../activity";

export function useWidgetConfig(
    host: HTMLElement
): UspWidgetConfig | null {
    return useMemo(() => {
        const baseConfig = readUspConfig(host);
        if (!baseConfig) {
            activity('bootstrap', '[USP] Widget is not correctly configured', null, 'error');
            return null;
        }

        activity('bootstrap', '[USP] Widget config loaded', baseConfig);

        return baseConfig
    }, [host]);
}



