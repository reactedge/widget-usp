export interface NavigationProps {
    current: number;
    total: number;
    onChange: (index: number) => void;
}

export interface UspSliderProps {
    slides:  UspSlide[];
    config: UspConfig;
}

export interface UspStaticProps {
    slides:  UspSlide[];
    config: UspConfig;
}

export interface UspSlideProps {
    slide: UspSlide;
    isActive: boolean;
    tileMode: boolean;
}

export interface UspSlide {
    text: string,
    backgroundColor: string,
    textColor: string
}

export type UspModeValue = "static" | "slider";

export interface UspConfig {
    mode: UspMode;
    height: string
    backgroundColor?: string;
}

export interface UspMode {
    desktop: UspModeValue;
    tablet: UspModeValue;
    mobile: UspModeValue;
}

export const defaultUspConfig: UspConfig = {
    mode: {
        desktop: "static",
        tablet: "slider",
        mobile: "slider"
    },
    height: "50px",
};