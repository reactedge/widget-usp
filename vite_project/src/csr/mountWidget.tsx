import {createRoot} from "react-dom/client";
import {activity} from "../activity";
import {UspWidgetWrapper} from "../UspWidgetWrapper.tsx";
import type {UspWidgetConfig} from "../UspConfig.ts";

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
