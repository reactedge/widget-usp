import {UspWidget} from "./components/UspWidget.tsx";
import {Spinner} from "./components/Spinner.tsx";
import {readWidgetConfig, type UspWidgetConfig} from "./UspConfig.ts";

type Props = {
    rawConfig: UspWidgetConfig;
};

export const UspWidgetView = ({ rawConfig }: Props) => {
    const config = readWidgetConfig(rawConfig);

    if (!config) return null;

    if (config.data.slides.length === 0) return <Spinner />;

    return <UspWidget config={config} />
};

