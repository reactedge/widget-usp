import {createRoot} from "react-dom/client";
import type {WidgetConfig} from "./Config.ts";
import React from "react";
import {activity} from "./activity";
import {WidgetWrapper} from "./WidgetWrapper.tsx";
import {getMountedHost} from "./lib/hostReader.ts";

export async function mountWidget(hostElement: HTMLElement, config: WidgetConfig) {
    const mountedHost = getMountedHost(hostElement);

    activity('bootstrap', 'Widget mounted', hostElement);

    createRoot(mountedHost).render(<WidgetWrapper rawConfig={config} />);
}
