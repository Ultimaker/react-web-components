import * as React from 'react';

import splitTextByNewLine from '../utils/split_text_by_new_line';
import Modal from './modal';
import Button from './button';

export type ButtonType = 'primary' | 'secondary' | 'quiet';

export interface PopupProps {
  isOpen?: boolean;
  type: 'confirm' | 'prompt';
  headerText: string;
  bodyText: string;
  inputType?: 'text' | 'number';
  inputMin?: number;
  inputMax?: number;
  validationHandler?: Function;
  primaryBtnText: string;
  primaryBtnHandler: Function;
  primaryBtnType?: ButtonType;
  secondaryBtnText?: string;
  secondaryBtnHandler?: Function;
  secondaryBtnType?: ButtonType;
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
  private promptInput: HTMLInputElement;

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
    this._handleChange = this._handleChange.bind(this);
    this._primaryBtnHandler = this._primaryBtnHandler.bind(this);
    this._secondaryBtnHandler = this._secondaryBtnHandler.bind(this);
  }

  componentDidMount() {
    this._focusOnPromptInput();
    this._setPopupBodyClass();
    window.addEventListener("resize", this._setPopupBodyClass);

    if (this.props.inputType === 'number' && this.props.inputMin) {
      this.setState({ inputValue: this.props.inputMin.toString() });
      this.promptInput.value = this.props.inputMin.toString();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._setPopupBodyClass);
  }

  _focusOnPromptInput() {
    if (this.promptInput) {
      this.promptInput.focus();
    }
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

  _primaryBtnHandler(event): void {
    event.preventDefault()

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
      this._focusOnPromptInput();
      return false;
    }
  }

  _secondaryBtnHandler(): void {
    this.props.secondaryBtnHandler();
    this.setState({ secondaryBtnSpinner: true });
  }

  _handleChange(event): void {
    this.setState({ inputValue: event.target.value, validationError: false });
  }

  _getBtnClass(type: ButtonType): string {
    return type ? 'btn--' + type : 'btn--primary';
  }

  render(): JSX.Element {

    const { isOpen, type, headerText, bodyText, primaryBtnText, secondaryBtnText, primaryBtnHandler,
      secondaryBtnHandler, primaryBtnType, secondaryBtnType, promptPlaceholder, inputType, inputMin, inputMax } = this.props;
    const { inputValue, previousInputValue, validationError, validationErrorMsg, primaryBtnSpinner,
      secondaryBtnSpinner } = this.state;

    const showValidationError = validationError && validationErrorMsg && validationErrorMsg.length > 0;

    const primaryBtnClass = this._getBtnClass(primaryBtnType);
    const secondaryBtnClass = this._getBtnClass(secondaryBtnType);

    return <Modal>
      <form noValidate className="popup" onSubmit={this._primaryBtnHandler}>

        <div className="popup__header">
          {headerText}
        </div>

        <div className="popup__body" ref={popupBody => this.popupBody = popupBody} >
          {splitTextByNewLine(bodyText)}

          {type === 'prompt' &&
            <div className="prompt-input">
              <input
                type={inputType ? inputType : null}
                min={inputMin ? inputMin : null}
                max={inputMax ? inputMax : null}
                onChange={this._handleChange}
                placeholder={promptPlaceholder}
                className={validationError ? 'error' : ''}
                ref={input => this.promptInput = input} />

              {showValidationError &&
                <div className="validation-error">{validationErrorMsg}</div>
              }
            </div>
          }
        </div>

        <div className="popup__actions">

          <div className="btn__container">
            <Button
              additionalClasses={primaryBtnClass}
              disabled={validationError || secondaryBtnSpinner}
              type="submit"
              showSpinner={primaryBtnSpinner}>

              {primaryBtnText}
            </Button>
          </div>

          {secondaryBtnText &&
            <div className="btn__container">
              <Button
                additionalClasses={secondaryBtnClass}
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