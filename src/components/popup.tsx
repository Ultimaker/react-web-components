import * as React from 'react';

import splitTextByNewLine from '../utils/split_text_by_new_line';
import Modal from './modal';
import { default as Button, ButtonStyle } from './button';
import { default as InputField, InputFieldType } from './input_field';

export type PopupType = 'confirm' | 'prompt' | 'children';

export interface PopupProps {
  /** Type of popup: 'confirm' | 'prompt' | 'children' */
  type: PopupType;
  /** Popup header text */
  headerText: string;
  /** Popup body text */
  bodyText: string;
  /** Input type for popups of type prompt */
  inputType?: InputFieldType;
  /** Input default value for popups of type prompt */
  inputDefaultValue?: string | number;
  /** Input minimum value for popups of type prompt */
  inputMin?: number;
  /** Input max value for popups of type prompt */
  inputMax?: number;
  /** If passed, the validationHandler is called when the primary button is clicked. 
   * The primaryBtnHandler is then only called if no error message is returned. */
  validationHandler?: (value: string | number) => string;
  /** Primary button text */
  primaryBtnText: string;
  /** Called when the primary button is clicked (after validationHandler) */
  primaryBtnHandler: (value: string | number) => void;
  /** Primary button style */
  primaryBtnStyle?: ButtonStyle;
  /** Secondary button text */
  secondaryBtnText?: string;
  /** Called when the secondary button is clicked */
  secondaryBtnHandler?: () => void;
  /** Secondary button style */
  secondaryBtnStyle?: ButtonStyle;
  /** Placeholder text for the input for popups of type prompt */
  promptPlaceholder?: string;
}

export interface PopupState {
  inputValue: string;
  previousInputValue: string;
  validationErrorMsg: string;
  primaryBtnSpinner: boolean;
  secondaryBtnSpinner: boolean;
}

export class Popup extends React.Component<PopupProps, PopupState> {

  state = {
    inputValue: undefined,
    previousInputValue: undefined,
    validationErrorMsg: undefined,
    primaryBtnSpinner: false,
    secondaryBtnSpinner: false,
  }

  private popupBodyRef: React.RefObject<HTMLDivElement>;;

  constructor(props) {
    super(props);

    this.popupBodyRef = React.createRef();

    // bind callbacks once
    this._onChangeHandler = this._onChangeHandler.bind(this);
    this._primaryBtnHandler = this._primaryBtnHandler.bind(this);
    this._secondaryBtnHandler = this._secondaryBtnHandler.bind(this);
  }

  _primaryBtnHandler(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const inputValue = this.state.inputValue;

    this.setState({ previousInputValue: inputValue });

    if (this.props.validationHandler) {
      if (this._isValidInput()) {
        this.props.primaryBtnHandler(inputValue);
        this.setState({ primaryBtnSpinner: true });
      }
    }
    else {
      this.props.primaryBtnHandler(inputValue);
      this.setState({ primaryBtnSpinner: true });
    }
  }

  _isValidInput(): boolean {
    const inputValue = this.state.inputValue;

    const validationErrorMsg = this.props.validationHandler(inputValue);

    if (!validationErrorMsg) {
      return true;
    }
    else {
      this.setState({ validationErrorMsg: validationErrorMsg });
      return false;
    }
  }

  _secondaryBtnHandler(): void {
    this.props.secondaryBtnHandler();
    this.setState({ secondaryBtnSpinner: true });
  }

  _onChangeHandler(id: string, value: string): void {
    this.setState({ inputValue: value, validationErrorMsg: null });
  }

  render(): JSX.Element {
    const { type, headerText, bodyText, primaryBtnText, secondaryBtnText, promptPlaceholder, inputType,
      inputMin, inputMax, primaryBtnStyle, secondaryBtnStyle, inputDefaultValue, children } = this.props;
    const { validationErrorMsg, primaryBtnSpinner, secondaryBtnSpinner } = this.state;

    return <Modal>
      <form noValidate className="popup" onSubmit={this._primaryBtnHandler}>

        <div className="popup__header">
          {headerText}
        </div>

        <div className="popup__body" ref={this.popupBodyRef} >
          {splitTextByNewLine(bodyText)}

          {type === 'prompt' &&
            <div className="prompt-input">
              <InputField
                id="prompt-input"
                type={inputType ? inputType : null}
                defaultValue={inputDefaultValue}
                min={inputMin ? inputMin : null}
                max={inputMax ? inputMax : null}
                onChangeHandler={this._onChangeHandler}
                placeholder={promptPlaceholder}
                validationErrorMsg={validationErrorMsg}
                focusOnLoad />

            </div>
          }

          {type === 'children' && children}
        </div>

        <div className="popup__actions">

          <div className="btn__container">
            <Button
              style={primaryBtnStyle}
              disabled={validationErrorMsg && validationErrorMsg.length > 0 || secondaryBtnSpinner}
              type="submit"
              showSpinner={primaryBtnSpinner}>

              {primaryBtnText}
            </Button>
          </div>

          {secondaryBtnText &&
            <div className="btn__container">
              <Button
                style={secondaryBtnStyle}
                disabled={primaryBtnSpinner}
                onClickHandler={this._secondaryBtnHandler}
                showSpinner={secondaryBtnSpinner}>

                {secondaryBtnText}
              </Button>
            </div>
          }

        </div>

      </form>
    </Modal>
  };
}

export default Popup;