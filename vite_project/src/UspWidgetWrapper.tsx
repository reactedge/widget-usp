import {useWidgetConfig} from "./hooks/useWidgetConfig.ts";
import {UspWidget} from "./components/UspWidget.tsx";
import {Spinner} from "./components/Spinner.tsx";

type Props = {
    host: HTMLElement;
    onStable?: () => void;
};

export const WIDGET_ID = 'USP';

export const UspWidgetWrapper = ({ host, onStable }: Props) => {
    const config = useWidgetConfig(host);

    if (!config) return null;

    if (config.slides.length === 0) return <Spinner />;

    return <UspWidget onStable={onStable} config={config} />
};

