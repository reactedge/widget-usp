import {createRoot} from "react-dom/client";
import {ensureGlobalStyle} from "./lib/style.ts";
import {fallback} from "./lib/fallback.ts";
import { restoreCache, snapshotCache } from './cache';
import {UspWidgetWrapper} from "./UspWidgetWrapper.tsx";
import {activity} from "./activity";
import {getMountedHost} from "./widget-runtime/lib/hostReader.ts";

const cache = { name: 'usp', version: 'v1' };

export function mountWidget(hostElement: HTMLElement) {
    const mountedHost = getMountedHost(hostElement);

    ensureGlobalStyle('reactedge-usp-css', '/widget/usp.css');

    const { restored } = restoreCache(mountedHost, cache);

    if (restored) {
        console.debug('[widget] cache hit');
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

    createRoot(mountNode).render(element);

    activity('bootstrap', '[USP] Widget mounted');

    fallback(hostElement)
}
