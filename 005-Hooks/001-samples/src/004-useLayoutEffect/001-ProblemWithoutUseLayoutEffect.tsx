import React, { useState, useEffect } from 'react';

import styles from './styles.module.css';

export default function ProblemWithoutUseLayoutEffect() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);

  // ❌ PROBLEM: useEffect runs AFTER the browser has painted
  // This causes a visible flicker/layout shift
  useEffect(() => {
    if (showTooltip && buttonRef) {
      const rect = buttonRef.getBoundingClientRect();
      setTooltipPosition({
        top: rect.bottom + 10,
        left: rect.left
      });
    }
  }, [showTooltip, buttonRef]);

  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} ${styles.titleProblem}`}>
        ❌ Problem: Flickering Tooltip (without useLayoutEffect)
      </h2>

      <div className={`${styles.contentContainer} ${styles.contentContainerProblem}`}>
        <p className={styles.description}>
          Click the button below to see the problem. Notice how the tooltip appears with a visible flicker or layout shift.
        </p>

        <div className={styles.buttonContainer}>
          <button
            ref={setButtonRef}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className={`${styles.button} ${styles.buttonProblem}`}
          >
            Hover me to see the problem
          </button>

          {showTooltip && (
            <div
              className={`${styles.tooltip} ${styles.tooltipProblem}`}
              style={{
                top: tooltipPosition.top,
                left: tooltipPosition.left
              }}
            >
              This tooltip appears with a flicker!
              <div className={styles.tooltipArrow} />
            </div>
          )}
        </div>

        <div className={`${styles.infoBox} ${styles.infoBoxProcess}`}>
          <h4 className={`${styles.infoBoxTitle} ${styles.infoBoxTitleProcess}`}>What's happening:</h4>
          <ul className={`${styles.infoBoxList} ${styles.infoBoxListProcess}`}>
            <li>Button renders with initial state</li>
            <li>User hovers over button</li>
            <li><code className={styles.code}>showTooltip</code> becomes <code className={styles.code}>true</code></li>
            <li>Tooltip renders with default position <code className={styles.code}>(0, 0)</code></li>
            <li>Browser paints the tooltip at wrong position</li>
            <li><code className={styles.code}>useEffect</code> runs and calculates correct position</li>
            <li>Tooltip moves to correct position (causing flicker)</li>
          </ul>
        </div>

        <div className={`${styles.infoBox} ${styles.infoBoxProblem}`}>
          <h4 className={`${styles.infoBoxTitle} ${styles.infoBoxTitleProblem}`}>The Problem:</h4>
          <ul className={`${styles.infoBoxList} ${styles.infoBoxListProblem}`}>
            <li><strong>Visible flicker:</strong> Tooltip appears at wrong position first</li>
            <li><strong>Layout shift:</strong> Content jumps when tooltip moves</li>
            <li><strong>Poor UX:</strong> User sees the tooltip "jumping" into place</li>
            <li><strong>Timing issue:</strong> useEffect runs after browser paint</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 