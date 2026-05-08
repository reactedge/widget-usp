import React from 'react';
import {UspWidget} from "./components/UspWidget.tsx";
import {Spinner} from "./components/Spinner.tsx";
import {readWidgetConfig, type UspWidgetConfig} from "./UspConfig.ts";

type Props = {
    rawConfig: UspWidgetConfig;
    onStable?: () => void;
};

export const UspWidgetWrapper = ({ rawConfig, onStable }: Props) => {
    const config = readWidgetConfig(rawConfig);

    if (!config) return null;

    if (config.data.slides.length === 0) return <Spinner />;

    return <UspWidget onStable={onStable} config={config} />
};

