import * as React from 'react';

import splitTextByNewLine from '../utils/split_text_by_new_line';
import Modal from './modal';
import { default as Button, ButtonStyle } from './button';
import { default as InputField, InputFieldType } from './input_field';

export type PopupType = 'confirm' | 'prompt';

export interface PopupProps {
  isOpen?: boolean;
  type: PopupType;
  headerText: string;
  bodyText: string;
  inputType?: InputFieldType;
  inputMin?: number;
  inputMax?: number;
  validationHandler?: (value: string | number) => string;
  primaryBtnText: string;
  primaryBtnHandler: (value: string | number) => void;
  primaryBtnStyle?: ButtonStyle;
  secondaryBtnText?: string;
  secondaryBtnHandler?: () => void;
  secondaryBtnStyle?: ButtonStyle;
  promptPlaceholder?: string;
}

export interface PopupState {
  inputValue: string;
  previousInputValue: string;
  validationError: boolean;
  validationErrorMsg: string;
  primaryBtnSpinner: boolean;
  secondaryBtnSpinner: boolean;
}

export default class Popup extends React.Component<PopupProps, PopupState> {

  private popupBody: HTMLElement;

  constructor(props) {
    super(props);

    this.state = {
      inputValue: undefined,
      previousInputValue: undefined,
      validationError: false,
      validationErrorMsg: undefined,
      primaryBtnSpinner: false,
      secondaryBtnSpinner: false,
    };

    this._setPopupBodyClass = this._setPopupBodyClass.bind(this);
    this._onChangeHandler = this._onChangeHandler.bind(this);
    this._primaryBtnHandler = this._primaryBtnHandler.bind(this);
    this._secondaryBtnHandler = this._secondaryBtnHandler.bind(this);
  }

  componentDidMount(): void {
    this._setPopupBodyClass();
    window.addEventListener("resize", this._setPopupBodyClass);
  }

  componentWillUnmount(): void {
    window.removeEventListener("resize", this._setPopupBodyClass);
  }

  _setPopupBodyClass(): void {
    if (this.props.isOpen) {
      const popupBody = this.popupBody;

      if (popupBody.scrollHeight > popupBody.clientHeight) {
        popupBody.classList.add('popup__body--scrollable');
      }
      else {
        popupBody.classList.remove('popup__body--scrollable');
      }
    }
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
      this.setState({ validationErrorMsg: validationErrorMsg, validationError: true });
      return false;
    }
  }

  _secondaryBtnHandler(): void {
    this.props.secondaryBtnHandler();
    this.setState({ secondaryBtnSpinner: true });
  }

  _onChangeHandler(value: string): void {
    this.setState({ inputValue: value, validationError: false });
  }

  render(): JSX.Element {
    const { isOpen, type, headerText, bodyText, primaryBtnText, secondaryBtnText, promptPlaceholder, inputType,
      inputMin, inputMax, primaryBtnStyle, secondaryBtnStyle } = this.props;
    const { validationError, validationErrorMsg, primaryBtnSpinner, secondaryBtnSpinner } = this.state;

    const showValidationError = validationError && validationErrorMsg && validationErrorMsg.length > 0;

    return <Modal isOpen={isOpen}>
      <form noValidate className="popup" onSubmit={this._primaryBtnHandler}>

        <div className="popup__header">
          {headerText}
        </div>

        <div className="popup__body" ref={popupBody => this.popupBody = popupBody} >
          {splitTextByNewLine(bodyText)}

          {type === 'prompt' &&
            <div className="prompt-input">
              <InputField
                type={inputType ? inputType : null}
                min={inputMin ? inputMin : null}
                max={inputMax ? inputMax : null}
                onChangeHandler={this._onChangeHandler}
                placeholder={promptPlaceholder}
                validationError={validationError}
                focusOnLoad />

              {showValidationError &&
                <div className="validation-error">{validationErrorMsg}</div>
              }
            </div>
          }
        </div>

        <div className="popup__actions">

          <div className="btn__container">
            <Button
              style={primaryBtnStyle}
              disabled={validationError || secondaryBtnSpinner}
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