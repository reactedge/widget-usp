export interface NavigationProps {
    current: number;
    total: number;
    onChange: (index: number) => void;
}

export interface UspSliderProps {
    slides:  UspSlide[];
    config: UspSettings;
}

export interface UspStaticProps {
    slides:  UspSlide[];
}

export interface UspSlideProps {
    slide: UspSlide;
    isActive: boolean;
    tileMode: boolean;
}

export interface UspSlide {
    text: string
}

export type UspModeValue = "static" | "slider";

export interface UspSettings {
    mode: UspMode;
}

export interface UspMode {
    desktop: UspModeValue;
    tablet: UspModeValue;
    mobile: UspModeValue;
}

export const defaultUspSettings: UspMode = {
    desktop: "static",
    tablet: "slider",
    mobile: "slider"
};