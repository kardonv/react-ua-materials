export function fibonacci(n: number): number {
    // console.log('Calculating fibonacci for:', n);
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
