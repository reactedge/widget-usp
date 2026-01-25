import type { UspSlideProps } from "./Types";

export const UspSlide = ({ slide, isActive, tileMode, config }: UspSlideProps) => {
    const { text, backgroundColor, textColor } = slide;

    const stateClass = !tileMode
        ? isActive
            ? "uspSlide--active"
            : "uspSlide--inactive"
        : "";

    return (
        <div
            className={`uspBaseWrapper ${stateClass}`}
            style={{
                backgroundColor: backgroundColor ?? config.backgroundColor,
                color: textColor ?? "inherit",
            }}
            data-usp-slide
            data-usp-active={isActive || undefined}
        >
            {text}
        </div>
    );

};