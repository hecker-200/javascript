import React, { useState } from 'react';
import { useCalculator } from '../hooks/useCalculator';
import { Display } from './Display';
import { Keypad } from './Keypad';
import { Graph } from './Graph';
import { History } from 'lucide-react';

export const Calculator: React.FC = () => {
    const { expression, result, history, handleInput, clearHistory } = useCalculator();
    const [showGraph, setShowGraph] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
            <div className="w-full max-w-md relative">
                {/* Main Calculator Body */}
                <div className="glass-panel rounded-3xl p-6 relative z-10">
                    <Display expression={expression} result={result} />

                    {showGraph && (
                        <Graph expression={expression || result} />
                    )}

                    <Keypad
                        onInput={handleInput}
                        onClearHistory={clearHistory}
                        onToggleGraph={() => setShowGraph(!showGraph)}
                    />
                </div>

                {/* History Side Panel (Desktop) / Overlay (Mobile) */}
                <div className={`
          absolute top-0 right-0 h-full w-64 glass-panel rounded-r-3xl p-4 transition-all duration-300 transform
          ${showHistory ? 'translate-x-full opacity-100' : 'translate-x-0 opacity-0 pointer-events-none'}
          hidden md:block
        `}>
                    <div className="h-full flex flex-col">
                        <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                            <History size={16} /> History
                        </h3>
                        <div className="flex-1 overflow-y-auto no-scrollbar space-y-2">
                            {history.map((item, i) => (
                                <div key={i} className="text-right p-2 rounded hover:bg-white/5 cursor-pointer"
                                    onClick={() => {
                                        handleInput(item.result);
                                    }}>
                                    <div className="text-xs text-gray-400">{item.expression}</div>
                                    <div className="text-sm text-white font-medium">= {item.result}</div>
                                </div>
                            ))}
                            {history.length === 0 && (
                                <div className="text-center text-gray-500 text-sm mt-10">No history yet</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile History Toggle */}
                <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="md:hidden absolute -top-10 right-0 text-white p-2"
                >
                    <History />
                </button>
            </div>
        </div>
    );
};
