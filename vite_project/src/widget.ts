import { mountWidget } from "./mountWidget";
import './styles/usp.css'

class UspWidget extends HTMLElement {
    connectedCallback() {
        mountWidget(this);
    }
}

customElements.define("usp-widget", UspWidget);
