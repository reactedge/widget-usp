import {createRoot} from "react-dom/client";
import {fallback} from "./lib/fallback.ts";
import { restoreCache, snapshotCache } from './cache';
import {UspWidgetWrapper} from "./UspWidgetWrapper.tsx";
import {activity} from "./activity";
import {getMountedHost} from "./widget-runtime/lib/hostReader.ts";

const cache = { name: 'usp', version: 'v1' };

export function mountWidget(hostElement: HTMLElement) {
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
            host={hostElement}
            onStable={() => {
                snapshotCache(mountedHost, cache)
            }}
        />
    );

    createRoot(mountNode).render(<div className="reactedge-usp">
        {element}
    </div>);

    activity('bootstrap', 'Widget mounted');

    fallback(hostElement)
}
