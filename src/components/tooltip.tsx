import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';

import splitTextByNewLine from '../utils/split_text_by_new_line';

export interface TooltipProps {
  tooltipText: string;
  direction?: 'north' | 'south';
  disableTooltip?: boolean;
}

export interface TooltipState {
  tooltipOffset: number;
}

const windowMargin = 10;

export default class Tooltip extends React.Component<TooltipProps, TooltipState> {

  constructor(props) {
    super(props);
    this.state = {
      tooltipOffset: null
    };

    this._setTooltipOffset = this._setTooltipOffset.bind(this);
  }

  componentDidMount(): void {
    this._setTooltipOffset();
    window.addEventListener("resize", this._setTooltipOffset);
  }

  componentWillUnmount(): void {
    window.removeEventListener("resize", this._setTooltipOffset);
  }

  _setTooltipOffset(): void {
    // get browser page width
    const windowWidth = window.innerWidth;

    // get dom elements
    const tooltipElement = ReactDOM.findDOMNode(this.refs.tooltip);
    const tooltipTriggerElement = tooltipElement.parentNode;

    // get element positions
    const tooltipWidth = this._getElementDetails(tooltipElement).width;
    const tooltipTriggerWidth = this._getElementDetails(tooltipTriggerElement).width;
    const tooltipTriggerLeft = this._getElementDetails(tooltipTriggerElement).left;
    const tooltipTriggerRight = this._getElementDetails(tooltipTriggerElement).right;
    const tooltipTriggerCenter = this._getElementDetails(tooltipTriggerElement).center;


    let tooltipOffset: number;

    // if the tooltip is off the screen to the left, move it right
    if (tooltipWidth / 2 > tooltipTriggerCenter) {
      // move relative to tooltipTrigger left
      tooltipOffset = (windowMargin - tooltipTriggerLeft) + tooltipWidth / 2
    }
    // if the tooltip is off the screen to the right, move it left
    else if (tooltipWidth / 2 > windowWidth - tooltipTriggerCenter) {
      // move move relative to tooltipTrigger right, then make negative so it can be applyed to the tooltip left
      tooltipOffset = (tooltipWidth / 2 - tooltipTriggerWidth - (windowWidth - tooltipTriggerRight) + windowMargin) * -1
    }
    else {
      tooltipOffset = null
    }

    this.setState({
      tooltipOffset: tooltipOffset
    });

  }

  _getElementDetails(el: any): any {
    // get global positions of a html element 
    el = el.getBoundingClientRect();
    return {
      left: el.left + window.scrollX,
      right: el.right + window.scrollX,
      width: el.width,
      center: (el.left + window.scrollX + el.right + window.scrollX) / 2
    }
  }

  _touchHoverFix(): boolean {
    return true
  }

  render(): JSX.Element {
    const { tooltipText, direction, disableTooltip, children } = this.props;
    const { tooltipOffset } = this.state;

    const directionClass = direction ? direction : 'north';
    const classes = classNames('tooltip-trigger', 'tooltip-trigger--' + directionClass, { 'disabled': disableTooltip });

    return <div className={classes} onTouchEnd={this._touchHoverFix}>
      {children}

      <div ref='tooltip' className="tooltip" style={{ left: tooltipOffset }}>
        <div className="text">
          {splitTextByNewLine(tooltipText)}
        </div>
      </div>

    </div>
  }
}
