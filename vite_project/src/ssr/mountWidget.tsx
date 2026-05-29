import type {WidgetConfig} from "../Config.ts";
import {activity} from "../activity";
import {hydrateRoot} from "react-dom/client";
import {WidgetWrapper} from "../WidgetWrapper.tsx";

export async function mountWidget(hostElement: HTMLElement, config: WidgetConfig) {
    const mountedHost = hostElement;

    activity('bootstrap', 'Widget mounted', hostElement);

    hydrateRoot(
        mountedHost,
        <WidgetWrapper rawConfig={config} />
    );
}
