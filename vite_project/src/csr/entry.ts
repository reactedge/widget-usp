import {type UspWidgetConfig, WIDGET_ID} from "../UspConfig.ts";
import {mountWidget} from "./mountWidget.tsx";


const mount = async (el: HTMLElement, config: UspWidgetConfig) => {
    await mountWidget(el, config)
}

const api = { mount };

(window as any)[`ReactEdge_${WIDGET_ID}`] = api;

export { mount };