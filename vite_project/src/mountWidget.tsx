import {createRoot} from "react-dom/client";
import { uspStyles } from "./styles/usp.styles";
import {injectStyles} from "./lib/style.ts";
import {fallback} from "./lib/fallback.ts";
import { restoreCache, snapshotCache } from './cache';
import {UspWidgetWrapper} from "./UspWidgetWrapper.tsx";

const cache = { name: 'usp', version: 'v1' };

export function mountWidget(hostElement: HTMLElement) {
    const shadow =
        hostElement.shadowRoot || hostElement.attachShadow({ mode: "open" });

    for (const css of uspStyles) {
        injectStyles(shadow, css);
    }

    const { restored } = restoreCache(shadow, cache);

    if (restored) {
        console.debug('[widget] cache hit');
    }

    let mountNode = shadow.querySelector('[data-widget-root]');
    if (!mountNode) {
        mountNode = document.createElement('div');
        mountNode.setAttribute('data-widget-root', '');
        shadow.appendChild(mountNode);
    }

    const element = (
        <UspWidgetWrapper
            host={hostElement}
            onStable={() => {
                snapshotCache(shadow, cache)
            }}
        />
    );

    createRoot(mountNode).render(element);

    fallback(hostElement)
}
