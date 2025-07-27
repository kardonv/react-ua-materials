import { render, screen, fireEvent } from '@testing-library/react';
import { Counter } from './Counter';

describe('Counter Component', () => {
    test('renders counter with provided value', () => {
        const mockHandleIncrement = jest.fn();
        const mockHandleDecrement = jest.fn();

        console.log(mockHandleIncrement);
        
        render(
            <Counter 
                counter={5} 
                handleIncrement={mockHandleIncrement} 
                handleDecrement={mockHandleDecrement} 
            />
        );

        const countElement = screen.getByTestId('count');
        expect(countElement).toHaveTextContent('5');
    });

    test('calls handleIncrement when increment button is clicked', () => {
        const mockHandleIncrement = jest.fn();
        const mockHandleDecrement = jest.fn();
        
        render(
            <Counter 
                counter={0} 
                handleIncrement={mockHandleIncrement} 
                handleDecrement={mockHandleDecrement} 
            />
        );

        const incrementButton = screen.getByTestId('increment-btn');
        
        fireEvent.click(incrementButton);

        expect(mockHandleIncrement).toHaveBeenCalledTimes(1);
    });

    test('calls handleDecrement when decrement button is clicked', () => {
        const mockHandleIncrement = jest.fn();
        const mockHandleDecrement = jest.fn();
        
        render(
            <Counter 
                counter={0} 
                handleIncrement={mockHandleIncrement} 
                handleDecrement={mockHandleDecrement} 
            />
        );

        const decrementButton = screen.getByTestId('decrement-btn');
        
        fireEvent.click(decrementButton);

        expect(mockHandleDecrement).toHaveBeenCalledTimes(1);
    });

    test('calls handleIncrement and handleDecrement multiple times', () => {
        const mockHandleIncrement = jest.fn();
        const mockHandleDecrement = jest.fn();
        
        render(
            <Counter 
                counter={0} 
                handleIncrement={mockHandleIncrement} 
                handleDecrement={mockHandleDecrement} 
            />
        );

        const incrementButton = screen.getByTestId('increment-btn');
        const decrementButton = screen.getByTestId('decrement-btn');

        // Click increment twice
        fireEvent.click(incrementButton);
        fireEvent.click(incrementButton);

        // Click decrement once
        fireEvent.click(decrementButton);

        expect(mockHandleIncrement).toHaveBeenCalledTimes(2);
        expect(mockHandleDecrement).toHaveBeenCalledTimes(1);
    });

    test('displays different counter values correctly', () => {
        const mockHandleIncrement = jest.fn();
        const mockHandleDecrement = jest.fn();
        
        // Test with positive value
        const { rerender } = render(
            <Counter 
                counter={10} 
                handleIncrement={mockHandleIncrement} 
                handleDecrement={mockHandleDecrement} 
            />
        );

        let countElement = screen.getByTestId('count');
        expect(countElement).toHaveTextContent('10');

        // Test with negative value
        rerender(
            <Counter 
                counter={-5} 
                handleIncrement={mockHandleIncrement} 
                handleDecrement={mockHandleDecrement} 
            />
        );

        countElement = screen.getByTestId('count');
        expect(countElement).toHaveTextContent('-5');
    });

    test('does not call functions on initial render', () => {
        const mockHandleIncrement = jest.fn();
        const mockHandleDecrement = jest.fn();
        
        render(
            <Counter 
                counter={0} 
                handleIncrement={mockHandleIncrement} 
                handleDecrement={mockHandleDecrement} 
            />
        );

        expect(mockHandleIncrement).not.toHaveBeenCalled();
        expect(mockHandleDecrement).not.toHaveBeenCalled();
    });
}); 