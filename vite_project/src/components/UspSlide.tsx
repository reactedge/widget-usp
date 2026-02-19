import type { UspSlideProps } from "./Types";

export const UspSlide = ({ slide, isActive, tileMode }: UspSlideProps) => {
    const { text } = slide;

    const stateClass = !tileMode
        ? isActive
            ? "uspSlide--active"
            : "uspSlide--inactive"
        : "";

    return (
        <div
            className={`uspBaseWrapper ${stateClass}`}
            data-usp-slide
            data-usp-active={isActive || undefined}
        >
            {text}
        </div>
    );

};