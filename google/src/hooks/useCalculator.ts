import { useState, useCallback } from 'react';
import { evaluateExpression } from '../utils/calculatorEngine';

export interface HistoryItem {
    expression: string;
    result: string;
    timestamp: number;
}

export const useCalculator = () => {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('');
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleInput = useCallback((value: string) => {
        setError(null);

        if (value === 'C') {
            setExpression('');
            setResult('');
            return;
        }

        if (value === 'DEL') {
            setExpression(prev => prev.slice(0, -1));
            return;
        }

        if (value === '=') {
            try {
                if (!expression) return;
                const calculatedResult = evaluateExpression(expression);
                setResult(calculatedResult);
                setHistory(prev => [
                    { expression, result: calculatedResult, timestamp: Date.now() },
                    ...prev.slice(0, 49) // Keep last 50 items
                ]);
                setExpression(calculatedResult); // Auto-update expression to result for continuous calculation
            } catch (err) {
                setError('Error');
            }
            return;
        }

        // Prevent multiple operators in a row (basic check)
        const isOperator = ['+', '-', '*', '/', '%'].includes(value);
        if (isOperator && ['+', '-', '*', '/', '%'].includes(expression.slice(-1))) {
            setExpression(prev => prev.slice(0, -1) + value);
            return;
        }

        setExpression(prev => prev + value);
    }, [expression]);

    const clearHistory = useCallback(() => {
        setHistory([]);
    }, []);

    return {
        expression,
        result,
        history,
        error,
        handleInput,
        clearHistory
    };
};
