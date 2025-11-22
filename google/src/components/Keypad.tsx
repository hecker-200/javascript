import React, { useState } from 'react';
import { Delete, RotateCcw, Calculator, Activity } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface KeypadProps {
    onInput: (value: string) => void;
    onClearHistory: () => void;
    onToggleGraph: () => void;
}

export const Keypad: React.FC<KeypadProps> = ({ onInput, onClearHistory, onToggleGraph }) => {
    const [isScientific, setIsScientific] = useState(false);

    const cn = (...inputs: (string | undefined | null | false)[]) => twMerge(clsx(inputs));

    const basicKeys = [
        { label: 'C', value: 'C', className: 'text-red-400' },
        { label: '(', value: '(', className: 'text-blue-400' },
        { label: ')', value: ')', className: 'text-blue-400' },
        { label: '÷', value: '/', className: 'text-blue-400' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
        { label: '9', value: '9' },
        { label: '×', value: '*', className: 'text-blue-400' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '-', value: '-', className: 'text-blue-400' },
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '+', value: '+', className: 'text-blue-400' },
        { label: '0', value: '0', className: 'col-span-2' },
        { label: '.', value: '.' },
        { label: '=', value: '=', className: 'bg-primary text-white hover:bg-primary/90' },
    ];

    const scientificKeys = [
        { label: 'sin', value: 'sin(' },
        { label: 'cos', value: 'cos(' },
        { label: 'tan', value: 'tan(' },
        { label: 'log', value: 'log(' },
        { label: 'ln', value: 'log(' }, // mathjs uses log for ln by default or log(x, base)
        { label: '√', value: 'sqrt(' },
        { label: '^', value: '^' },
        { label: 'π', value: 'pi' },
        { label: 'e', value: 'e' },
        { label: '!', value: '!' },
    ];

    return (
        <div className="w-full">
            <div className="flex justify-between mb-4 px-2">
                <button
                    onClick={() => setIsScientific(!isScientific)}
                    className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                    <Calculator size={14} />
                    {isScientific ? 'Basic' : 'Scientific'}
                </button>
                <div className="flex gap-4">
                    <button
                        onClick={onToggleGraph}
                        className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                    >
                        <Activity size={14} />
                        Graph
                    </button>
                    <button
                        onClick={onClearHistory}
                        className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                    >
                        <RotateCcw size={14} />
                        Clear History
                    </button>
                </div>
            </div>

            <div className={cn(
                "grid gap-3 transition-all duration-300",
                isScientific ? "grid-cols-5" : "grid-cols-4"
            )}>
                {isScientific && scientificKeys.map((key) => (
                    <button
                        key={key.label}
                        onClick={() => onInput(key.value)}
                        className="glass-button h-12 rounded-xl text-sm font-medium text-purple-300 hover:text-purple-200"
                    >
                        {key.label}
                    </button>
                ))}

                {basicKeys.map((key) => (
                    <button
                        key={key.label}
                        onClick={() => onInput(key.value)}
                        className={cn(
                            "glass-button h-16 rounded-xl text-xl font-medium text-white",
                            key.className
                        )}
                    >
                        {key.label === 'DEL' ? <Delete size={20} /> : key.label}
                    </button>
                ))}
                <button
                    onClick={() => onInput('DEL')}
                    className="glass-button h-16 rounded-xl text-xl font-medium text-red-400 flex items-center justify-center"
                >
                    <Delete size={24} />
                </button>
            </div>
        </div>
    );
};
