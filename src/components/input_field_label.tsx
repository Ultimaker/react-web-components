import * as React from 'react';
import classNames from 'classnames';

import InfoTooltip from './info_tooltip';
import InfoLink from './info_link';

export type InputFieldType = 'text' | 'number' | 'textarea' | 'password' | 'email' | 'url' | 'select' | 'checkbox' | 'image' | 'date' | 'file' | 'tags' | 'children';
export type LayoutWidth = '1/1' | '1/2' | '1/3' | '1/4' | '1/5' | 'fit' | 'fill';
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg';

export interface InputFieldProps {
  /** Input field type: 'text' | 'number' | 'textarea' | 'password' | 'email' | 'url' | 'select' | 'checkbox' | 'image' | 'date' | 'file' | 'children' */
  type: InputFieldType;
  /** Input field id. Must be unique */
  id: string;
  /** Input field label */
  label: string | JSX.Element;
  /** Input field label width: '1/1' | '1/2' | '1/3' | '1/4' | '1/5' */
  labelLayoutWidth: LayoutWidth;
  /** Input field label breakpoint: 'xs' | 'sm' | 'md' | 'lg' */
  labelWidthBreakpoint: Breakpoint;
  /** JSX Element, such as an icon, to be shown before the input label */
  preLabelElement?: JSX.Element
  /** Description of the fields to be shown in a tooltip */
  infoText?: string
  /** The URL of the link to be shown next to the input field */
  infoLinkURL?: string
  /** A list of suggestions for tags input field */
}


export class InputFieldLabel extends React.Component<InputFieldProps, {}> {

  protected _renderPreLabelElement(): JSX.Element {
    const { preLabelElement } = this.props;

    if (preLabelElement) {
      return <div className="layout__item u-fit input-field__pre-element">
        {preLabelElement}
      </div>
    }
    return null
  }

  protected _renderPostLabelElement(): JSX.Element {
    const { infoText, infoLinkURL } = this.props;

    if (infoText || infoLinkURL) {
      return <div className="layout__item u-fit input-field__label-addition">
        {infoText &&
          <InfoTooltip infoText={infoText} />
        }
        {infoLinkURL && !infoText && // can't have both an InfoTooltip and a InfoLink
          <InfoLink infoLinkURL={infoLinkURL} />
        }
      </div>
    }
    return null;
  }


  render(): JSX.Element {
    const { id, label, labelLayoutWidth, labelWidthBreakpoint, type } = this.props;
    
    const classes = classNames(`input-field__label layout__item u-${labelLayoutWidth}-${labelWidthBreakpoint}`,
      { 'tag-selector-label': type === 'tags' && labelLayoutWidth && labelLayoutWidth !== '1/1' });

    return (
      <div className={classes}>
        <div className="layout layout--gutter-sm" >
          {this._renderPreLabelElement()}
          <div className="layout__item u-fit">
            <label htmlFor={id}>{label}</label>
          </div>
          {this._renderPostLabelElement()}
        </div>
      </div>
    )
  };
};

export default InputFieldLabel;
