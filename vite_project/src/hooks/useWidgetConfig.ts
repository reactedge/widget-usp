import {useMemo} from "react";
import {readUspConfig, type UspWidgetConfig} from "../UspConfig.ts";

export function useWidgetConfig(
    host: HTMLElement
): UspWidgetConfig | null {
    return useMemo(() => {
        const baseConfig = readUspConfig(host);
        if (!baseConfig) return null;

        return baseConfig
    }, [host]);
}



