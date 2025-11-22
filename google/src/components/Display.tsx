import React, { useEffect, useRef } from 'react';
import { formatDisplay } from '../utils/calculatorEngine';

interface DisplayProps {
    expression: string;
    result: string;
}

export const Display: React.FC<DisplayProps> = ({ expression, result }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
    }, [expression, result]);

    return (
        <div className="w-full p-6 mb-4 rounded-2xl glass-panel flex flex-col items-end justify-end h-40 overflow-hidden relative">
            <div
                ref={scrollRef}
                className="w-full overflow-x-auto no-scrollbar text-right whitespace-nowrap text-gray-400 text-lg font-light mb-2"
            >
                {formatDisplay(expression) || '0'}
            </div>
            <div className="text-5xl font-bold text-white tracking-tight truncate w-full text-right">
                {result ? formatDisplay(result) : (expression ? '' : '0')}
            </div>
        </div>
    );
};
