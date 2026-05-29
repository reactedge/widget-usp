import React from 'react';
import {UspWidget} from "./components/UspWidget.tsx";
import {Spinner} from "./components/Spinner.tsx";
import {readWidgetConfig, type WidgetConfig} from "./Config.ts";

type Props = {
    rawConfig: WidgetConfig;
    onStable?: () => void;
};

export const WidgetWrapper = ({ rawConfig, onStable }: Props) => {
    const config = readWidgetConfig(rawConfig);

    if (!config) return null;

    if (config.data.slides.length === 0) return <Spinner />;

    return <UspWidget onStable={onStable} config={config} />
};

