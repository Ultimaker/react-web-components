import * as React from 'react';
import classNames from 'classnames';
import { I18n } from '../utils/i18n';

import InfoLink from './info_link';

export interface FileUploadProps {
  /** FileUpload id. Must be unique */
  id: string;
  /** Called when the file is selected is clicked */
  onChangeHandler: (value: HTMLInputElement) => void;
  /** Disables the file upload when true */
  disabled?: boolean;
}

export interface FileUploadState {
  selectedFileName: string
}

export class FileUpload extends React.Component<FileUploadProps, {}> {

  private input;

  state = {
    selectedFileName: null
  }

  constructor(props) {
    super(props);

    this._onChangeHandler = this._onChangeHandler.bind(this);
  }

  _onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ selectedFileName: e.target.files[0].name })
    this.props.onChangeHandler(e.target);
  }

  _stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
  }

  render(): JSX.Element {
    const { id, disabled } = this.props;
    const { selectedFileName } = this.state;

    const classes = classNames('file-upload', { disabled });
    const inputClasses = classNames('file-upload__input');

    return <div className={classes} onClick={this._stopPropagation} >
      <input
        id={id}
        name={id}
        type="file"
        onChange={this._onChangeHandler}
        disabled={disabled}
        ref={input => this.input = input}
      />
      <div className="layout layout--gutter-sm">
        <div className="layout__item u-fill file-upload__input-container">
          <label className={inputClasses} htmlFor={id}>{selectedFileName}</label>
        </div>
        <div className="layout__item u-fit">
          <label className='btn btn--primary' htmlFor={id}>{I18n.translate('file upload button', 'Choose file')}</label>
        </div>
      </div>
    </div>
  }
}

export default FileUpload;