import type {UspWidgetConfig} from "../UspConfig.ts";
import {activity} from "../activity";
import {hydrateRoot} from "react-dom/client";
import {UspWidgetWrapper} from "../UspWidgetWrapper.tsx";

export async function mountWidget(hostElement: HTMLElement, config: UspWidgetConfig) {
    const mountedHost = hostElement;

    activity('bootstrap', 'Widget mounted', hostElement);

    hydrateRoot(
        mountedHost,
        <UspWidgetWrapper rawConfig={config} />
    );
}
