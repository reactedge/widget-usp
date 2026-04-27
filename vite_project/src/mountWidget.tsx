import {createRoot} from "react-dom/client";
import {fallback} from "./lib/fallback.ts";
import { restoreCache, snapshotCache } from './cache';
import {UspWidgetWrapper} from "./UspWidgetWrapper.tsx";
import {activity} from "./activity";
import {getMountedHost} from "./widget-runtime/lib/hostReader.ts";

const cache = { name: 'usp', version: 'v1' };

export const WIDGET_ID = 'usp';

import './styles/usp.css'
import {type UspWidgetConfig} from "./UspConfig.ts";

export async function mountWidget(hostElement: HTMLElement, config: UspWidgetConfig) {
    const mountedHost = getMountedHost(hostElement);

    const { restored } = restoreCache(mountedHost, cache);

    if (restored) {
        activity('bootstrap', 'Widget cache hit');
    }

    let mountNode = mountedHost.querySelector('[data-widget-root]');
    if (!mountNode) {
        mountNode = document.createElement('div');
        mountNode.setAttribute('data-widget-root', '');
        mountedHost.appendChild(mountNode);
    }

    const element = (
        <UspWidgetWrapper
            rawConfig={config}
            onStable={() => {
                snapshotCache(mountedHost, cache)
            }}
        />
    );

    createRoot(mountNode).render(<div className="reactedge-usp">
        {element}
    </div>);

    activity('bootstrap', 'Widget mounted');

    fallback()
}
