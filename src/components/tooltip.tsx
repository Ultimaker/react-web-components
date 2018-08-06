import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';

import splitTextByNewLine from '../utils/split_text_by_new_line';

export type TooltipDirection = 'north' | 'south';

export interface TooltipProps {
  /** Text to be displayed inside the tooltip. \n can be used to create a new paragraph. */
  tooltipText: string;
  /** The positional direction of the tooltip: 'north' | 'south' */
  direction?: TooltipDirection;
  /** When true, the tooltip will not be displayed */
  disableTooltip?: boolean;
}

export interface TooltipState {
  tooltipOffset: number;
  showTooltip: boolean;
}

const windowMargin = 10;

export class Tooltip extends React.Component<TooltipProps, TooltipState> {

  state = {
    tooltipOffset: null,
    showTooltip: false
  };

  constructor(props) {
    super(props);

    this._showTooltip = this._showTooltip.bind(this);
    this._hideTooltip = this._hideTooltip.bind(this);
  }

  private _setTooltipOffset(): void {
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

  private _getElementDetails(el: any): any {
    // get global positions of a html element 
    el = el.getBoundingClientRect();
    return {
      left: el.left + window.scrollX,
      right: el.right + window.scrollX,
      width: el.width,
      center: (el.left + window.scrollX + el.right + window.scrollX) / 2
    }
  }

  private _showTooltip(): void {
    this._setTooltipOffset();
    this.setState({ showTooltip: true });
  }

  private _hideTooltip(): void {
    this.setState({ showTooltip: false });
  }

  public render(): JSX.Element {
    const { tooltipText, direction, disableTooltip, children } = this.props;
    const { tooltipOffset, showTooltip } = this.state;

    const directionClass = direction ? direction : 'north';
    const classes = classNames('tooltip-trigger', 'tooltip-trigger--' + directionClass, { 'disabled': disableTooltip }, { 'show': showTooltip });

    return <div className={classes} onTouchStart={this._showTooltip} onTouchEnd={this._hideTooltip}
      onPointerEnter={this._showTooltip} onPointerLeave={this._hideTooltip}>

      {children}

      <div ref='tooltip' className="tooltip" style={{ left: tooltipOffset }}>
        <div className="text">
          {splitTextByNewLine(tooltipText)}
        </div>
      </div>

    </div>
  }
}

export default Tooltip;