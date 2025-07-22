import { BreakpointConfig } from './BreakpointConfig';

export interface BreakpointState {
    current: keyof BreakpointConfig;
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isLargeDesktop: boolean;
    matches: (breakpoint: keyof BreakpointConfig) => boolean;
    isAbove: (breakpoint: keyof BreakpointConfig) => boolean;
    isBelow: (breakpoint: keyof BreakpointConfig) => boolean;
    isBetween: (min: keyof BreakpointConfig, max: keyof BreakpointConfig) => boolean;
  }