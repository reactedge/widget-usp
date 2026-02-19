import { useState } from "react";
import { NavigationArrows } from "./NavigationArrows.tsx";
import type { UspSliderProps } from "./Types.ts";
import { UspSlide } from "./UspSlide.tsx";

export function UspSlider({ slides, config }: UspSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const ratio = config.mode.desktop || "16:7";
    const [w, h] = ratio.split(":").map(Number);
    const paddingTop = (h / w) * 100;

    return (
        <div className="uspSlider" style={{ height: config.height }}>
            <div className="uspSlider__inner" style={{ paddingTop: `${paddingTop}%` }}>
                {slides.map((slide, i) => (
                    <UspSlide
                        key={i}
                        slide={slide}
                        isActive={i === currentIndex}
                        tileMode={false}
                    />
                ))}
            </div>

            <NavigationArrows
                current={currentIndex}
                total={slides.length}
                onChange={setCurrentIndex}
            />
        </div>
    );
}
