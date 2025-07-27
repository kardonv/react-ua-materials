import { render, screen } from '@testing-library/react';

import { Greet } from './Greet';

describe('Greet', () => {
    test('Greet renders correctly', () => {
        render(<Greet />);
        const textElement = screen.getByText(/hello/i);
        expect(textElement).toBeInTheDocument();
    })

    describe('Nested', () => {
        test('Greet renders with a name', () => {
            render(<Greet name="John" />);
            const textElement = screen.getByText(/hello John/i);
            expect(textElement).toBeInTheDocument();
        })
    })
})