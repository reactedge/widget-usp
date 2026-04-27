import type {UspWidgetConfig} from "./UspConfig.ts";
import {mountWidget} from "./mountWidget.tsx";

export async function mount(el: HTMLElement, config: UspWidgetConfig) {
    if (!config) {
        throw new Error('Config is required');
    }

   await mountWidget(el, config)
}
