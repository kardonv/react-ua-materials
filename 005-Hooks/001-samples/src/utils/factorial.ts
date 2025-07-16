export function factorial(n: number): number {
    console.log('Calculating factorial for:', n);
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
