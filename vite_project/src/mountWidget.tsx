import {createRoot} from "react-dom/client";
import type {UspWidgetConfig} from "./UspConfig.ts";
import React from "react";
import {activity} from "./activity";
import {UspWidgetWrapper} from "./UspWidgetWrapper.tsx";
import {getMountedHost} from "./lib/hostReader.ts";

export async function mountWidget(hostElement: HTMLElement, config: UspWidgetConfig) {
    const mountedHost = getMountedHost(hostElement);

    activity('bootstrap', 'Widget mounted', hostElement);

    const element = (
        <UspWidgetWrapper
            rawConfig={config}
        />
    );

    createRoot(mountedHost).render(element);
}
