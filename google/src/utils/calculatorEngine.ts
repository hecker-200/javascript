import { create, all } from 'mathjs';

const math = create(all);

export const evaluateExpression = (expression: string): string => {
    try {
        // Replace visual symbols with mathjs compatible operators
        const sanitized = expression
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/π/g, 'pi')
            .replace(/√/g, 'sqrt');

        const result = math.evaluate(sanitized);

        // Format result to avoid floating point errors and keep it clean
        return math.format(result, { precision: 14 });
    } catch (error) {
        throw new Error('Invalid Expression');
    }
};

export const formatDisplay = (expression: string): string => {
    // Add spaces around operators for better readability
    return expression
        .replace(/([+\-*/])/g, ' $1 ')
        .replace(/\*/g, '×')
        .replace(/\//g, '÷');
};
