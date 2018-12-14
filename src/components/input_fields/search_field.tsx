// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

// components
import { InputFieldProps } from './input_field_wrapper';
import DefaultInputField from './default_input_field';
import Button from '../button';
import RejectedIcon from '../icons/rejected_icon';
import PendingIcon from '../icons/pending_icon';

/**
 * The props used in the search field.
 */
export interface SearchFieldProps extends InputFieldProps {
    /** Input field value */
    value: string | null;
    /** Maximum amount of characters allowed in the field */
    maxLength?: number;
    /** Called when the field changes */
    onChangeHandler: (id: string, value: string) => any;
    /** If true, the field will be focused when loaded */
    focusOnLoad?: boolean;
    /** html placeholder text */
    placeholder?: string;
    /** Optional extra elements to be displayed after the input */
    children?: any;
}

/**
 * The search field is a text field that includes .
 * @param wrapperProps - The properties to be passed to the wrapper.
 * @param children - Any extra children to be displayed after the text.
 * @constructor
 */
export default class SearchField extends React.Component<SearchFieldProps, {}> {
    private readonly _inputRef: React.RefObject<HTMLInputElement> =
        React.createRef<HTMLInputElement>();

    constructor(props) {
        super(props);
        this._onResetHandler = this._onResetHandler.bind(this);
        this._focus = this._focus.bind(this);
    }

    /**
     * Focuses on this field during mount if required.
     */
    componentDidMount(): void {
        const { focusOnLoad } = this.props;
        if (focusOnLoad) {
            this._focus();
        }
    }

    /**
     * Focuses on this field.
     * @private
     */
    private _focus(): void {
        this._inputRef.current.focus();
    }

    /**
     * Resets the value of the search and re-focuses on the input.
     * @private
     */
    private _onResetHandler(): void {
        const { onChangeHandler, id } = this.props;
        onChangeHandler(id, null);
        this._focus();
    }

    /**
     * Renders the search field.
     */
    render() {
        const { children, ...wrapperProps } = this.props;
        const { staticField, value } = wrapperProps;
        return (
            <div className="search-field">
                <DefaultInputField
                    inputChildren={children}
                    inputRef={this._inputRef}
                    {...wrapperProps}
                >
                    {staticField ? value
                        : (
                            <Button
                                onClickHandler={value ? this._onResetHandler : this._focus}
                                style="quiet"
                                className="search-button"
                            >
                                {value ? <RejectedIcon size="sm" /> : <PendingIcon size="sm" />}
                            </Button>
                        )
                    }
                </DefaultInputField>
            </div>
        );
    }
}
