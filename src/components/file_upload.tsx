import * as React from 'react';
import classNames from 'classnames';
import { I18n } from '../utils/i18n';

export interface FileUploadProps {
  /** FileUpload id. Must be unique */
  id: string;
  /** Called when the file is selected is clicked */
  onChangeHandler: (value: string) => void;
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
    console.log('e.target', e.target);

    this.setState({ selectedFileName: e.target.value.replace(/^.*[\\\/]/, '') })
    this.props.onChangeHandler(e.target.value);
  }

  _stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
  }

  render(): JSX.Element {
    const { id, disabled } = this.props;
    const { selectedFileName } = this.state;

    const classes = classNames('file-upload', { disabled });

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
        <div className="layout__item u-fill file-upload__label-container">
          <label className='file-upload__label' htmlFor={id}>{selectedFileName}</label>
        </div>
        <div className="layout__item u-fit">
          <label className='btn btn--primary' htmlFor={id}>{I18n.translate('file upload button', 'Choose file')}</label>
        </div>
      </div>
    </div>
  }
}

export default FileUpload;