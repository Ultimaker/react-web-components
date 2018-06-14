import * as React from 'react';

export interface CloseButtonProps {
  onClickHandler: (e: React.MouseEvent<HTMLElement>) => void;
}

const CloseButton: React.StatelessComponent<CloseButtonProps> = ({ onClickHandler }) => {

  const _onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClickHandler(e);
  }

  return (
    <div className="close-button" onClick={_onClickHandler}>
      <div className="icon">
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><title>Close</title><path d="M12.41,10.81l5.66-5.65a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0L11,9.4,5.34,3.74a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l5.66,5.65L3.93,16.47a1,1,0,0,0,1.41,1.41L11,12.23l5.66,5.65a1,1,0,0,0,1.41-1.41Z" /></svg>
      </div>
    </div>
  );
};

export default CloseButton;