import { useEffect, useState } from "react";
import { UspSlide } from "./UspSlide.tsx";
import type { UspStaticProps } from "./Types.ts";

export function UspStatic({ slides }: UspStaticProps) {
    const [breakpoint, setBreakpoint] = useState<"mobile" | "tablet" | "desktop">("desktop");

    useEffect(() => {
        const updateBreakpoint = () => {
            const width = window.innerWidth;
            if (width <= 640) setBreakpoint("mobile");
            else if (width <= 1024) setBreakpoint("tablet");
            else setBreakpoint("desktop");
        };

        updateBreakpoint();
        window.addEventListener("resize", updateBreakpoint);
        return () => window.removeEventListener("resize", updateBreakpoint);
    }, []);

    return (
        <div className={`uspStatic uspStatic--${breakpoint}`}>
            {slides.map((slide, index) => (
                <div key={index} className="uspStatic__tile">
                    <UspSlide slide={slide} isActive={false} tileMode={true} />
                </div>
            ))}
        </div>
    );
}
