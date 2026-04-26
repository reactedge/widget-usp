import { mountWidget } from "./mountWidget";

class UspWidget extends HTMLElement {
    connectedCallback() {
        mountWidget(this);
    }
}

customElements.define("usp-widget", UspWidget);
