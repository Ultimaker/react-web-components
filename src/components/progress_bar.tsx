import * as React from 'react';
import classNames from 'classnames';

export interface ProgressBarProps {
  /** Percentage fill of the progress bar */
  progressPercentage: number;
  /** Set to true if the process is stopped/paused */
  isStopped?: boolean;
  /** The height of the progress bar. Include unit */
  barHeight?: string
}

export const ProgressBar: React.StatelessComponent<ProgressBarProps> =
  ({ progressPercentage, isStopped, barHeight, children }) => {

    const barClasses = classNames('progress-bar__progress-indicator', { 'stopped': isStopped });
    const barStyle = { width: progressPercentage + '%', height: barHeight };
    const emptyBarStyle = { width: 100 - progressPercentage + '%', height: barHeight };

    return (
      <div className="progress-bar">
        <span className={barClasses} style={barStyle}></span>
        <span className="progress-bar__empty" style={emptyBarStyle}></span>
        {children}
      </div>
    )
  };

ProgressBar.defaultProps = {
  progressPercentage: 0,
  barHeight: '0.6rem'
};

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;
