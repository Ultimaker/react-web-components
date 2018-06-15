import * as React from 'react';
import { UnmountClosed } from 'react-collapse';

import CloseButton from "./close_button";

export interface SlideOutContainerProps {
  close: () => void;
  showClose: boolean;
  isOpen: boolean;
}

const SlideOutContainer: React.StatelessComponent<SlideOutContainerProps> =
  ({ close, showClose, isOpen, children }): JSX.Element => {

    return <div className="slide-out-container">
      <UnmountClosed isOpened={isOpen}>
        <section className="container">
          <div className="content">
            {showClose && <CloseButton onClickHandler={close} />}
            {children}
          </div>
        </section>
      </UnmountClosed>
    </div>

  };

export default SlideOutContainer;
