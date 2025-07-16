import React, { useState, useEffect, useCallback } from 'react';
import styles from './styles.module.css';

// Custom Hook: useBreakpoint
// Detects and tracks screen size breakpoints for responsive design

interface BreakpointConfig {
  xs: number;   // Extra small devices (phones)
  sm: number;   // Small devices (tablets)
  md: number;   // Medium devices (small laptops)
  lg: number;   // Large devices (desktops)
  xl: number;   // Extra large devices (large desktops)
  xxl: number;  // Extra extra large devices
}

interface BreakpointState {
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

const defaultBreakpoints: BreakpointConfig = {
  xs: 0,    // 0px and up
  sm: 576,  // 576px and up
  md: 768,  // 768px and up
  lg: 992,  // 992px and up
  xl: 1200, // 1200px and up
  xxl: 1400  // 1400px and up
};

function useBreakpoint(
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

// Example Component demonstrating useBreakpoint
const UseBreakpointExample: React.FC = () => {
  const breakpoint = useBreakpoint();
  const [log, setLog] = useState<string[]>([]);

  const addToLog = (message: string) => {
    setLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // Log breakpoint changes
  useEffect(() => {
    addToLog(`Breakpoint changed to: ${breakpoint.current} (${breakpoint.width}px)`);
  }, [breakpoint.current, breakpoint.width]);

  const breakpointInfo = [
    { name: 'xs', width: '0px+', description: 'Extra small devices (phones)' },
    { name: 'sm', width: '576px+', description: 'Small devices (tablets)' },
    { name: 'md', width: '768px+', description: 'Medium devices (small laptops)' },
    { name: 'lg', width: '992px+', description: 'Large devices (desktops)' },
    { name: 'xl', width: '1200px+', description: 'Extra large devices (large desktops)' },
    { name: 'xxl', width: '1400px+', description: 'Extra extra large devices' }
  ];

  return (
    <div className={styles.breakpointContainer}>
      <h2 className={styles.breakpointTitle}>useBreakpoint Custom Hook Example</h2>
      <p className={styles.breakpointDescription}>
        This example demonstrates a custom hook that detects and tracks screen size breakpoints
        for responsive design. Try resizing your browser window to see the changes.
      </p>

      <div className={styles.breakpointGrid}>
        
        {/* Current Breakpoint Info */}
        <div className={styles.breakpointCard}>
          <h3 className={styles.breakpointCardTitle}>Current Breakpoint</h3>
          <div className={styles.currentBreakpoint}>
            {breakpoint.current.toUpperCase()}
          </div>
          <div className={styles.windowSize}>
            <div className={styles.windowSizeValue}>
              {breakpoint.width} × {breakpoint.height}
            </div>
            <div className={styles.windowSizeLabel}>
              Window Size
            </div>
          </div>
        </div>

        {/* Device Type Indicators */}
        <div className={styles.breakpointCard}>
          <h3 className={styles.breakpointCardTitle}>Device Type</h3>
          <div className={styles.deviceList}>
            <div className={`${styles.deviceItem} ${breakpoint.isMobile ? styles.deviceItemActive : styles.deviceItemInactive}`}>
              <span>📱 Mobile</span>
              <span className={`${styles.deviceStatus} ${breakpoint.isMobile ? styles.deviceStatusActive : styles.deviceStatusInactive}`}>
                {breakpoint.isMobile ? '✓' : '✗'}
              </span>
            </div>
            <div className={`${styles.deviceItem} ${breakpoint.isTablet ? styles.deviceItemActive : styles.deviceItemInactive}`}>
              <span>📱 Tablet</span>
              <span className={`${styles.deviceStatus} ${breakpoint.isTablet ? styles.deviceStatusActive : styles.deviceStatusInactive}`}>
                {breakpoint.isTablet ? '✓' : '✗'}
              </span>
            </div>
            <div className={`${styles.deviceItem} ${breakpoint.isDesktop ? styles.deviceItemActive : styles.deviceItemInactive}`}>
              <span>💻 Desktop</span>
              <span className={`${styles.deviceStatus} ${breakpoint.isDesktop ? styles.deviceStatusActive : styles.deviceStatusInactive}`}>
                {breakpoint.isDesktop ? '✓' : '✗'}
              </span>
            </div>
            <div className={`${styles.deviceItem} ${breakpoint.isLargeDesktop ? styles.deviceItemActive : styles.deviceItemInactive}`}>
              <span>🖥️ Large Desktop</span>
              <span className={`${styles.deviceStatus} ${breakpoint.isLargeDesktop ? styles.deviceStatusActive : styles.deviceStatusInactive}`}>
                {breakpoint.isLargeDesktop ? '✓' : '✗'}
              </span>
            </div>
          </div>
        </div>

        {/* Breakpoint Methods */}
        <div className={styles.breakpointCard}>
          <h3 className={styles.breakpointCardTitle}>Breakpoint Methods</h3>
          <div className={styles.methodsList}>
            <div className={`${styles.methodItem} ${breakpoint.matches('md') ? styles.methodItemActive : styles.methodItemInactive}`}>
              <strong>matches('md'):</strong> {breakpoint.matches('md') ? '✓' : '✗'}
            </div>
            <div className={`${styles.methodItem} ${breakpoint.isAbove('sm') ? styles.methodItemActive : styles.methodItemInactive}`}>
              <strong>isAbove('sm'):</strong> {breakpoint.isAbove('sm') ? '✓' : '✗'}
            </div>
            <div className={`${styles.methodItem} ${breakpoint.isBelow('lg') ? styles.methodItemActive : styles.methodItemInactive}`}>
              <strong>isBelow('lg'):</strong> {breakpoint.isBelow('lg') ? '✓' : '✗'}
            </div>
            <div className={`${styles.methodItem} ${breakpoint.isBetween('sm', 'xl') ? styles.methodItemActive : styles.methodItemInactive}`}>
              <strong>isBetween('sm', 'xl'):</strong> {breakpoint.isBetween('sm', 'xl') ? '✓' : '✗'}
            </div>
          </div>
        </div>

        {/* Responsive Layout Demo */}
        <div className={styles.breakpointCard}>
          <h3 className={styles.breakpointCardTitle}>Responsive Layout Demo</h3>
          <div className={`${styles.responsiveGrid} ${
            breakpoint.isMobile ? styles.responsiveGridMobile : 
            breakpoint.isTablet ? styles.responsiveGridTablet : 
            styles.responsiveGridDesktop
          }`}>
            <div className={`${styles.responsiveColumn} ${styles.column1}`}>
              Column 1
            </div>
            <div className={`${styles.responsiveColumn} ${styles.column2}`}>
              Column 2
            </div>
            <div className={`${styles.responsiveColumn} ${styles.column3} ${breakpoint.isMobile ? styles.columnHidden : ''}`}>
              Column 3
            </div>
          </div>
          <div className={styles.layoutInfo}>
            Layout: {breakpoint.isMobile ? 'Single Column' : breakpoint.isTablet ? 'Two Columns' : 'Three Columns'}
          </div>
        </div>
      </div>

      {/* Breakpoint Reference */}
      <div style={{ marginTop: '20px' }}>
        <h3>Breakpoint Reference</h3>
        <div className={styles.referenceGrid}>
          {breakpointInfo.map((bp) => (
            <div key={bp.name} className={`${styles.referenceCard} ${breakpoint.current === bp.name ? styles.referenceCardActive : styles.referenceCardInactive}`}>
              <div className={`${styles.referenceName} ${breakpoint.current === bp.name ? styles.referenceNameActive : styles.referenceNameInactive}`}>
                {bp.name.toUpperCase()}
              </div>
              <div className={styles.referenceWidth}>
                {bp.width}
              </div>
              <div className={styles.referenceDescription}>
                {bp.description}
              </div>
              {breakpoint.current === bp.name && (
                <div className={styles.referenceCurrent}>
                  CURRENT
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Log */}
      <div className={styles.breakpointLogContainer}>
        <h3 className={styles.breakpointLogTitle}>Breakpoint Change Log:</h3>
        <div className={styles.breakpointLogDisplay}>
          {log.map((entry, index) => (
            <div key={index} className={styles.breakpointLogEntry}>
              {entry}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.breakpointFeaturesContainer}>
        <h4 className={styles.breakpointFeaturesTitle}>useBreakpoint Hook Features:</h4>
        <ul className={styles.breakpointFeaturesList}>
          <li>✅ Real-time breakpoint detection</li>
          <li>✅ Customizable breakpoint values</li>
          <li>✅ Device type indicators (mobile, tablet, desktop)</li>
          <li>✅ Utility methods (matches, isAbove, isBelow, isBetween)</li>
          <li>✅ Window dimensions tracking</li>
          <li>✅ SSR-safe (works with Next.js)</li>
          <li>✅ Type-safe with TypeScript</li>
          <li>✅ Automatic cleanup of event listeners</li>
        </ul>
      </div>

      <div className={styles.usageContainer}>
        <h4 className={styles.usageTitle}>Usage Examples:</h4>
        <pre className={styles.codeBlock}>
{`// Basic usage
const breakpoint = useBreakpoint();

// Custom breakpoints
const breakpoint = useBreakpoint({
  sm: 600,
  md: 900,
  lg: 1200
});

// Conditional rendering
{breakpoint.isMobile && <MobileMenu />}
{breakpoint.isDesktop && <DesktopMenu />}

// Responsive styles
const styles = {
  width: breakpoint.isMobile ? '100%' : '50%',
  fontSize: breakpoint.isMobile ? '14px' : '16px'
};

// Complex conditions
{breakpoint.isBetween('sm', 'lg') && <TabletComponent />}`}
        </pre>
      </div>
    </div>
  );
};

export default UseBreakpointExample; 