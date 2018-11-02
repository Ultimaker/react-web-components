// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

import {InputFieldProps} from './input_field_wrapper';
import DefaultInputField from './default_input_field'
import Button from '../button';
import RejectedIcon from '../icons/rejected_icon';
import PendingIcon from '../icons/pending_icon';
import {RefObject} from 'react'

export interface SearchFieldProps extends InputFieldProps {
    /** Input field value */
    value: string | null;
    /** Maximum amount of characters allowed in the field **/
    maxLength?: number;
    /** Called when the field changes */
    onChangeHandler: (id: string, value: string) => any;
    /** If true, the field will be focused when loaded */
    focusOnLoad?: boolean;
    /** html placeholder text */
    placeholder?: string;
    /** Optional extra elements to be displayed after the input **/
    children?: any;
}

/**
 * The search field is a text field that includes .
 * @param wrapperProps - The properties to be passed to the wrapper.
 * @param children - Any extra children to be displayed after the text.
 * @constructor
 */
export default class SearchField extends React.Component<SearchFieldProps, {}> {
    private readonly _inputRef: RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

    constructor(props) {
        super(props);
        this._onResetHandler = this._onResetHandler.bind(this);
        this._focus = this._focus.bind(this);
    }


    private _focus(): void {
        this._inputRef.current.focus();
    }

    private _onResetHandler(): void {
        const { onChangeHandler, id } = this.props;
        onChangeHandler(id, null);
        this._focus();
    }

    render() {
        const {children, ...wrapperProps} = this.props;
        const {} = wrapperProps;
        return <div className="search-field">
            <DefaultInputField inputChildren={children} {...wrapperProps} inputRef={this._inputRef}>
                {wrapperProps.staticField ? wrapperProps.value :
                    <Button onClickHandler={wrapperProps.value ? this._onResetHandler : this._focus}>
                        {wrapperProps.value ? <RejectedIcon size="sm" /> : <PendingIcon size="sm" />}
                    </Button>
                }
            </DefaultInputField>
        </div>;
    }
}
