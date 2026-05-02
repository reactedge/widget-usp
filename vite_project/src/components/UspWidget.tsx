import { useState} from "react";
import {UspStatic} from "./UspStatic.tsx";
import {UspSlider} from "./UspSlider.tsx";
import {Spinner} from "./Spinner.tsx";
import type {UspWidgetConfig} from "../UspConfig.ts";

type Props = {
    onStable?: () => void;
    config: UspWidgetConfig
};

export const UspWidget = ({ onStable, config }: Props) => {
    const getMode = () => {
        if (window.matchMedia("(max-width: 640px)").matches)
            return config.settings.mode.mobile;

        if (window.matchMedia("(max-width: 1024px)").matches)
            return config.settings.mode.tablet;

        return config.settings.mode.desktop;
    };

    const [mode] = useState(getMode);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            onStable?.();
        });
    });

    if (config.data.slides.length === 0) return <Spinner />;

    if (mode === "slider") {
        return <UspSlider slides={config.data.slides} config={config.settings}/>;
    }

    return <UspStatic slides={config.data.slides} config={config.settings} />;
};

