import * as React from 'react';
import { Motion, spring } from 'react-motion';
import classNames from 'classnames';

export interface SlideInPanelProps {
  /** Text to be displayed in the panel header */
  headerTitle: string;
  /** The panel will be open when true */
  isOpen: boolean;
  /** Called when the background overlay is clicked */
  onOverlayClickHandler?: Function;
  /** Width of panel. Include unit */
  width?: string;
  /** Show footer */
  includeFooter?: boolean;
}

export class SlideInPanel extends React.Component<SlideInPanelProps, {}> {

  _handleOverlayClick(e: React.MouseEvent<HTMLDivElement>): void {
    const { onOverlayClickHandler } = this.props;

    e.stopPropagation();

    if (onOverlayClickHandler) {
      onOverlayClickHandler();
    }
  }

  render(): JSX.Element {
    const { headerTitle, isOpen, width, includeFooter, children } = this.props;

    const motion = { stiffness: 450, damping: 50 };
    const classes = classNames('slide-in-panel', { isOpen });

    return <div className={classes} onClick={(e) => this._handleOverlayClick(e)}>

      <Motion style={{ x: spring(isOpen ? 0 : 100, motion) }}>
        {({ x }) =>
          <div className="slide-in-panel__container" style={{ transform: `translate3d(${x}%,0,0)`, width }}>
            <div className="slide-in-panel__header">
              {headerTitle}
            </div>
            <div className="slide-in-panel__content">
              {children[0]}
            </div>
            {includeFooter &&
              <div className="slide-in-panel__footer">
                {children[1]}
              </div>
            }
          </div>
        }
      </Motion>

    </div>

  }
}

export default SlideInPanel;
