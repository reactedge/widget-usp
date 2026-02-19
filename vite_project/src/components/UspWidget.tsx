import {useEffect, useLayoutEffect, useState} from "react";
import {UspStatic} from "./UspStatic.tsx";
import {UspSlider} from "./UspSlider.tsx";
import {Spinner} from "./Spinner.tsx";
import type {UspWidgetConfig} from "../UspConfig.ts";

type Props = {
    onStable?: () => void;
    config: UspWidgetConfig
};

export const UspWidget = ({ onStable, config }: Props) => {
    const [mode, setMode] = useState<'static' | 'slider' | null>(null);

    useLayoutEffect(() => {
        const width = window.innerWidth;

        if (width >= 1024) setMode(config.settings.mode.desktop);
        else if (width >= 768) setMode(config.settings.mode.tablet);
        else setMode(config.settings.mode.mobile);
    }, []);

    const isVolatileEnvironment =
        window.matchMedia('(max-width: 1023px)').matches ||
        'ontouchstart' in window;

    useEffect(() => {
        if (!config.data.slides.length) return;
        if (!mode) return;
        if (isVolatileEnvironment) return;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                onStable?.();
            });
        });
    }, [config.data.slides.length, mode]);

    if (config.data.slides.length === 0) return <Spinner />;

    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    const isTablet = window.matchMedia("(min-width: 641px) and (max-width: 1024px)").matches;

    let currentMode = config.settings.mode.desktop;

    if (isMobile) currentMode = config.settings.mode.mobile;
    else if (isTablet) currentMode = config.settings.mode.tablet;

    if (currentMode === "slider") {
        return <UspSlider slides={config.data.slides} config={config.settings}/>;
    }

    return <UspStatic slides={config.data.slides} />;
};

