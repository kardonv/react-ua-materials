import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import './styles.module.css';

export default function UseLayoutEffect() {
  const [showUseEffectTooltip, setShowUseEffectTooltip] = useState(false);
  const [showUseLayoutEffectTooltip, setShowUseLayoutEffectTooltip] = useState(false);
  const [useEffectPosition, setUseEffectPosition] = useState({ top: 0, left: 0 });
  
  const useEffectButtonRef = useRef<HTMLButtonElement>(null);
  const useLayoutEffectButtonRef = useRef<HTMLButtonElement>(null);
  const useLayoutEffectTooltipRef = useRef<HTMLDivElement>(null);

  // ❌ useEffect - runs AFTER browser paint (causes flicker)
  useEffect(() => {
    console.log('useEffect');
    if (showUseEffectTooltip && useEffectButtonRef.current) {
      const rect = useEffectButtonRef.current.getBoundingClientRect();
      setUseEffectPosition({
        top: rect.bottom + 10,
        left: rect.left
      });
    }
  }, [showUseEffectTooltip]);

  // ✅ useLayoutEffect - runs BEFORE browser paint (no flicker)
  useLayoutEffect(() => {
    console.log('useLayoutEffect');
    if (showUseLayoutEffectTooltip && useLayoutEffectButtonRef.current && useLayoutEffectTooltipRef.current) {
      const rect = useLayoutEffectButtonRef.current.getBoundingClientRect();
      const tooltip = useLayoutEffectTooltipRef.current;
      
      // Direct DOM manipulation - no state updates needed
      tooltip.style.top = `${rect.bottom + 10}px`;
      tooltip.style.left = `${rect.left}px`;
      tooltip.style.visibility = 'visible';
    }
  }, [showUseLayoutEffectTooltip]);

  return (
    <div className="useLayoutEffect-demo">
      <div className="demo-header">
        <h1>🔄 useLayoutEffect vs useEffect</h1>
        <p>See the difference in timing and user experience</p>
      </div>

      <div className="comparison-container">
        {/* useEffect Example */}
        <div className="example-section useEffect-section">
          <h2>❌ useEffect (Problem)</h2>
          <p>Runs after browser paint - causes visible flicker</p>
          
          <div className="button-container">
            <button
              ref={useEffectButtonRef}
              className="demo-button useEffect-button"
              onMouseEnter={() => setShowUseEffectTooltip(true)}
              onMouseLeave={() => setShowUseEffectTooltip(false)}
            >
              Hover me (useEffect)
            </button>

            {showUseEffectTooltip && (
              <div
                className="tooltip useEffect-tooltip"
                style={{
                  position: 'absolute',
                  top: useEffectPosition.top,
                  left: useEffectPosition.left
                }}
              >
                <div className="tooltip-content">
                  <span className="tooltip-icon">💥</span>
                  <span>This tooltip flickers!</span>
                </div>
                <div className="tooltip-arrow" />
              </div>
            )}
          </div>

          <div className="info-card">
            <h3>What happens:</h3>
            <ol>
              <li>Button renders</li>
              <li>User hovers</li>
              <li>Tooltip renders at (0,0)</li>
              <li>Browser paints tooltip at wrong position</li>
              <li>useEffect runs and calculates correct position</li>
              <li>State updates, tooltip moves (flicker!)</li>
            </ol>
          </div>
        </div>

        {/* useLayoutEffect Example */}
        <div className="example-section useLayoutEffect-section">
          <h2>✅ useLayoutEffect (Solution)</h2>
          <p>Runs before browser paint - smooth appearance</p>
          
          <div className="button-container">
            <button
              ref={useLayoutEffectButtonRef}
              className="demo-button useLayoutEffect-button"
              onMouseEnter={() => setShowUseLayoutEffectTooltip(true)}
              onMouseLeave={() => setShowUseLayoutEffectTooltip(false)}
            >
              Hover me (useLayoutEffect)
            </button>

            {showUseLayoutEffectTooltip && (
              <div
                ref={useLayoutEffectTooltipRef}
                className="tooltip useLayoutEffect-tooltip"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  visibility: 'hidden' // Hidden until positioned
                }}
              >
                <div className="tooltip-content">
                  <span className="tooltip-icon">✨</span>
                  <span>This tooltip appears smoothly!</span>
                </div>
                <div className="tooltip-arrow" />
              </div>
            )}
          </div>

          <div className="info-card">
            <h3>What happens:</h3>
            <ol>
              <li>Button renders</li>
              <li>User hovers</li>
              <li>Tooltip renders (hidden)</li>
              <li>useLayoutEffect runs and positions tooltip</li>
              <li>Tooltip becomes visible at correct position</li>
              <li>Browser paints tooltip correctly (no flicker!)</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="explanation-section">
        <h2>🎯 Key Differences</h2>
        
        <div className="differences-grid">
          <div className="difference-card">
            <h3>Timing</h3>
            <div className="difference-content">
              <div className="useEffect-timing">
                <h4>useEffect</h4>
                <p>Runs after browser paint</p>
                <div className="timeline">
                  <span>Render</span> → <span>Paint</span> → <span>useEffect</span>
                </div>
              </div>
              <div className="useLayoutEffect-timing">
                <h4>useLayoutEffect</h4>
                <p>Runs before browser paint</p>
                <div className="timeline">
                  <span>Render</span> → <span>useLayoutEffect</span> → <span>Paint</span>
                </div>
              </div>
            </div>
          </div>

          <div className="difference-card">
            <h3>Performance Impact</h3>
            <div className="difference-content">
              <div className="useEffect-performance">
                <h4>useEffect</h4>
                <ul>
                  <li>Asynchronous</li>
                  <li>Doesn't block paint</li>
                  <li>Can cause layout thrashing</li>
                  <li>Better for non-critical updates</li>
                </ul>
              </div>
              <div className="useLayoutEffect-performance">
                <h4>useLayoutEffect</h4>
                <ul>
                  <li>Synchronous</li>
                  <li>Blocks paint</li>
                  <li>Prevents layout thrashing</li>
                  <li>Use sparingly for critical updates</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="difference-card">
            <h3>Use Cases</h3>
            <div className="difference-content">
              <div className="useEffect-cases">
                <h4>useEffect</h4>
                <ul>
                  <li>API calls</li>
                  <li>Event listeners</li>
                  <li>Subscriptions</li>
                  <li>Non-critical UI updates</li>
                </ul>
              </div>
              <div className="useLayoutEffect-cases">
                <h4>useLayoutEffect</h4>
                <ul>
                  <li>DOM measurements</li>
                  <li>Layout calculations</li>
                  <li>Preventing flicker</li>
                  <li>Critical UI positioning</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="warning-section">
        <h2>⚠️ Important Notes</h2>
        <div className="warning-content">
          <div className="warning-card">
            <h3>When to use useLayoutEffect</h3>
            <ul>
              <li><strong>DOM measurements:</strong> When you need to measure elements</li>
              <li><strong>Layout calculations:</strong> Positioning elements relative to others</li>
              <li><strong>Preventing flicker:</strong> When useEffect causes visible jumps</li>
              <li><strong>Critical UI updates:</strong> When timing is crucial for UX</li>
            </ul>
          </div>
          
          <div className="warning-card">
            <h3>When NOT to use useLayoutEffect</h3>
            <ul>
              <li><strong>API calls:</strong> Use useEffect for data fetching</li>
              <li><strong>Non-critical updates:</strong> Don't block paint unnecessarily</li>
              <li><strong>Heavy computations:</strong> Can cause performance issues</li>
              <li><strong>Event listeners:</strong> useEffect is better for subscriptions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 