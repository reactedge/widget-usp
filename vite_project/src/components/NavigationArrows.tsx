import type { NavigationProps } from "./Types.ts";
import {handleArrowButtonKeyDown} from "../lib/keyboard.ts";

export function NavigationArrows({ current, total, onChange }: NavigationProps) {
    const prev = () => onChange(current === 0 ? total - 1 : current - 1);
    const next = () => onChange(current === total - 1 ? 0 : current + 1);

    return (
        <div className="navigationArrows">
            <button className="arrowBtn" onClick={prev} onKeyDown={(e) =>
                handleArrowButtonKeyDown(e, prev, ['ArrowLeft', 'Enter', ' '])
            } data-usp-prev>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round" />
                </svg>
            </button>

            <button className="arrowBtn" onClick={next} onKeyDown={(e) =>
                handleArrowButtonKeyDown(e, next, ['ArrowRight', 'Enter', ' '])
            } data-usp-next>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    );
};
