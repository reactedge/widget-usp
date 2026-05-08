import {createRoot} from "react-dom/client";
import type {UspWidgetConfig} from "./UspConfig.ts";
import React from "react";
import {activity} from "./activity";
import {UspWidgetWrapper} from "./UspWidgetWrapper.tsx";

export async function mountWidget(hostElement: HTMLElement, config: UspWidgetConfig) {
    const mountedHost = hostElement;

    activity('bootstrap', 'Widget mounted', hostElement);

    const element = (
        <UspWidgetWrapper
            rawConfig={config}
        />
    );

    createRoot(mountedHost).render(<div className="reactedge-usp">
        {element}
    </div>);
}
