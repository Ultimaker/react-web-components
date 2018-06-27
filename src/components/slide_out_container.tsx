import * as React from 'react';
import { UnmountClosed } from 'react-collapse';

import PanelArrow from "./panel_arrow";

export interface SlideOutContainerProps {
  /** Text to be displayed above the slide out content */
  headerText: string;
}

export interface SlideOutContainerState {
  isOpen: boolean;
}

export class SlideOutContainer extends React.Component<SlideOutContainerProps, SlideOutContainerState> {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  _toggleBodyVisibility() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render(): JSX.Element {
    const { isOpen } = this.state;
    const { headerText, children } = this.props;

    return <div className="slide-out-container">

      <div className="slide-out-container__header" onClick={() => this._toggleBodyVisibility()}>
        <div className="layout layout--align-middle">
          <div className="layout__item u-fill">
            {headerText}
          </div>
          <div className="layout__item arrow-column">
            <PanelArrow active={isOpen} width="1.6rem" />
          </div>
        </div>
      </div>

      <UnmountClosed isOpened={isOpen}>
        <div className="slide-out-container__body">
          {children}
        </div>
      </UnmountClosed>

    </div>

  }
}

export default SlideOutContainer;
