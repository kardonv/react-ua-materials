import { useCallback, useEffect, useState } from 'react';
import { BreakpointConfig, BreakpointState } from '../types';

const defaultBreakpoints: BreakpointConfig = {
    xs: 0,    // 0px and up
    sm: 576,  // 576px and up
    md: 768,  // 768px and up
    lg: 992,  // 992px and up
    xl: 1200, // 1200px and up
    xxl: 1400  // 1400px and up
};

export function useBreakpoint(
    customBreakpoints?: Partial<BreakpointConfig>
): BreakpointState {
    const breakpoints = { ...defaultBreakpoints, ...customBreakpoints };

    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0
    });

    const getCurrentBreakpoint = useCallback((width: number): keyof BreakpointConfig => {
        if (width >= breakpoints.xxl) return 'xxl';
        if (width >= breakpoints.xl) return 'xl';
        if (width >= breakpoints.lg) return 'lg';
        if (width >= breakpoints.md) return 'md';
        if (width >= breakpoints.sm) return 'sm';
        return 'xs';
    }, [breakpoints]);

    const matches = useCallback((breakpoint: keyof BreakpointConfig): boolean => {
        return windowSize.width >= breakpoints[breakpoint];
    }, [windowSize.width, breakpoints]);

    const isAbove = useCallback((breakpoint: keyof BreakpointConfig): boolean => {
        return windowSize.width > breakpoints[breakpoint];
    }, [windowSize.width, breakpoints]);

    const isBelow = useCallback((breakpoint: keyof BreakpointConfig): boolean => {
        return windowSize.width < breakpoints[breakpoint];
    }, [windowSize.width, breakpoints]);

    const isBetween = useCallback((
        min: keyof BreakpointConfig,
        max: keyof BreakpointConfig
    ): boolean => {
        return windowSize.width >= breakpoints[min] && windowSize.width < breakpoints[max];
    }, [windowSize.width, breakpoints]);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        // Set initial size
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const current = getCurrentBreakpoint(windowSize.width);

    return {
        current,
        width: windowSize.width,
        height: windowSize.height,
        isMobile: current === 'xs' || current === 'sm',
        isTablet: current === 'md',
        isDesktop: current === 'lg' || current === 'xl',
        isLargeDesktop: current === 'xxl',
        matches,
        isAbove,
        isBelow,
        isBetween
    };
}