import React, { useEffect, useRef } from 'react';
import functionPlot from 'function-plot';

interface GraphProps {
    expression: string;
}

export const Graph: React.FC<GraphProps> = ({ expression }) => {
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!rootRef.current) return;

        try {
            // Basic sanitization for function-plot
            // It expects 'x' as variable. If expression is just a number, it plots a line.
            // If it's like 'sin(x)', it plots it.
            // We might need to handle empty expression or invalid ones gracefully.

            const width = rootRef.current.clientWidth;
            const height = rootRef.current.clientHeight;

            let fn = expression;
            if (!fn || fn === 'Error') fn = '0';

            // Replace some JS math symbols if needed, though function-plot handles many
            fn = fn.replace(/π/g, 'PI').replace(/√/g, 'sqrt');

            functionPlot({
                target: rootRef.current,
                width,
                height,
                yAxis: { domain: [-10, 10] },
                xAxis: { domain: [-10, 10] },
                grid: true,
                data: [
                    {
                        fn: fn,
                        color: '#60a5fa', // blue-400
                        graphType: 'polyline'
                    }
                ],
                tip: {
                    xLine: true,
                    yLine: true,
                }
            });
        } catch (e) {
            // If plotting fails (invalid syntax for graph), just don't crash
            console.warn('Graph plot error:', e);
        }
    }, [expression]);

    return (
        <div className="w-full h-64 rounded-2xl glass-panel overflow-hidden mb-4 relative">
            <div ref={rootRef} className="w-full h-full" />
            <div className="absolute top-2 right-2 text-xs text-gray-400 pointer-events-none">
                Powered by function-plot
            </div>
        </div>
    );
};
