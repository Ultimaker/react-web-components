import * as React from 'react';
import * as classNames from 'classnames';

export interface ProgressBarProps {
  progressPercentage: number;
  isStopped: boolean;
}

const ProgressBar: React.StatelessComponent<ProgressBarProps> =
  ({ progressPercentage, isStopped, children }) => {

    const barClasses = classNames('progress-bar__progress-indicator', { 'stopped': isStopped });
    const barInlineStyle = { width: progressPercentage + '%' };

    return (
      <div className="progress-bar">
        <span className={barClasses} style={barInlineStyle}></span>
        {children}
      </div>
    )
  };

ProgressBar.defaultProps = {
  progressPercentage: 0
};

export default ProgressBar;
