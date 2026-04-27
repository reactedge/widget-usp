import type {UspWidgetConfig} from "./UspConfig.ts";
import {mountWidget, WIDGET_ID} from "./mountWidget.tsx";

const mount = async (el: HTMLElement, config: UspWidgetConfig) => {
   await mountWidget(el, config)
}

const api = { mount };

(window as any)[`ReactEdge_${WIDGET_ID}`] = api;

export { mount };