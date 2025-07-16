import React, { useState, useLayoutEffect } from 'react';

import styles from './styles.module.css';

export default function SolutionWithUseLayoutEffect() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);

  // ✅ SOLUTION: useLayoutEffect runs BEFORE the browser has painted
  // This prevents the visible flicker/layout shift
  useLayoutEffect(() => {
    console.log('useLayoutEffect running:', { showTooltip, buttonRef: !!buttonRef });
    if (showTooltip && buttonRef) {
      const rect = buttonRef.getBoundingClientRect();
      console.log('Button rect:', rect);
      const newPosition = {
        top: rect.bottom + 10,
        left: rect.left
      };
      console.log('Setting tooltip position:', newPosition);
      setTooltipPosition(newPosition);
    }
  }, [showTooltip, buttonRef]);

  const handleMouseEnter = () => {
    console.log('Mouse enter - setting showTooltip to true');
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    console.log('Mouse leave - setting showTooltip to false');
    setShowTooltip(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} ${styles.titleSolution}`}>
        ✅ Solution: Smooth Tooltip (with useLayoutEffect)
      </h2>

      <div className={`${styles.contentContainer} ${styles.contentContainerSolution}`}>
        <p className={styles.description}>
          Hover over the button below to see the solution. Notice how the tooltip appears smoothly without any flicker or layout shift.
        </p>

        <div className={styles.buttonContainer}>
          <button
            ref={setButtonRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`${styles.button} ${styles.buttonSolution}`}
          >
            Hover me to see the solution
          </button>

          {showTooltip && (
            <div
              className={`${styles.tooltip} ${styles.tooltipSolution}`}
              style={{
                top: tooltipPosition.top,
                left: tooltipPosition.left
              }}
            >
              This tooltip appears smoothly!
              <div className={styles.tooltipArrow} />
            </div>
          )}
        </div>

        <div className={`${styles.infoBox} ${styles.infoBoxProcessSolution}`}>
          <h4 className={`${styles.infoBoxTitle} ${styles.infoBoxTitleProcessSolution}`}>What's happening now:</h4>
          <ul className={`${styles.infoBoxList} ${styles.infoBoxListProcessSolution}`}>
            <li>Button renders with initial state</li>
            <li>User hovers over button</li>
            <li><code className={styles.code}>showTooltip</code> becomes <code className={styles.code}>true</code></li>
            <li><code className={styles.code}>useLayoutEffect</code> runs BEFORE browser paint</li>
            <li>Correct position is calculated and set</li>
            <li>Tooltip renders at correct position immediately</li>
            <li>No flicker or layout shift occurs</li>
          </ul>
        </div>

        <div className={`${styles.infoBox} ${styles.infoBoxSolution}`}>
          <h4 className={`${styles.infoBoxTitle} ${styles.infoBoxTitleSolution}`}>The Solution:</h4>
          <ul className={`${styles.infoBoxList} ${styles.infoBoxListSolution}`}>
            <li><strong>No flicker:</strong> Tooltip appears at correct position immediately</li>
            <li><strong>No layout shift:</strong> Content doesn't jump around</li>
            <li><strong>Better UX:</strong> Smooth, professional appearance</li>
            <li><strong>Correct timing:</strong> useLayoutEffect runs before browser paint</li>
          </ul>
        </div>

        <div className={`${styles.infoBox} ${styles.infoBoxComparison}`}>
          <h4 className={`${styles.infoBoxTitle} ${styles.infoBoxTitleComparison}`}>useLayoutEffect vs useEffect:</h4>
          <div className={styles.comparisonGrid}>
            <div className={`${styles.comparisonColumn} ${styles.comparisonColumnProblem}`}>
              <h5>useEffect (Problem):</h5>
              <ul>
                <li>Runs after browser paint</li>
                <li>Causes visible flicker</li>
                <li>Layout shifts occur</li>
                <li>Poor user experience</li>
              </ul>
            </div>
            <div className={`${styles.comparisonColumn} ${styles.comparisonColumnSolution}`}>
              <h5>useLayoutEffect (Solution):</h5>
              <ul>
                <li>Runs before browser paint</li>
                <li>No visible flicker</li>
                <li>Smooth transitions</li>
                <li>Better user experience</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={`${styles.infoBox} ${styles.infoBoxUsage}`}>
          <h4 className={`${styles.infoBoxTitle} ${styles.infoBoxTitleUsage}`}>When to use useLayoutEffect:</h4>
          <ul className={`${styles.infoBoxList} ${styles.infoBoxListUsage}`}>
            <li><strong>DOM measurements:</strong> When you need to measure elements</li>
            <li><strong>Layout calculations:</strong> Positioning elements relative to others</li>
            <li><strong>Preventing flicker:</strong> When useEffect causes visible jumps</li>
            <li><strong>Synchronous updates:</strong> When you need updates before paint</li>
            <li><strong>Critical UI updates:</strong> When timing is crucial for UX</li>
          </ul>
          
          <div className={styles.warningBox}>
            <strong>⚠️ Important:</strong> useLayoutEffect is synchronous and blocks the browser paint, so use it sparingly. 
            Only use it when you need to prevent visual flicker or when useEffect causes layout issues.
          </div>
        </div>
      </div>
    </div>
  );
} 