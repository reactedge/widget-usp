import type { NavigationProps } from "./Types.ts";

export function NavigationArrows({ current, total, onChange }: NavigationProps) {
    const prev = () => onChange(current === 0 ? total - 1 : current - 1);
    const next = () => onChange(current === total - 1 ? 0 : current + 1);

    return (
        <div className="navigationArrows">
            <button className="arrowBtn" onClick={prev} data-usp-prev>‹</button>
            <button className="arrowBtn" onClick={next} data-usp-next>›</button>
        </div>
    );
};
