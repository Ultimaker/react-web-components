// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import classNames from 'classnames';

import InputFieldWrapper, { InputFieldProps } from './input_field_wrapper';
import TagsSelector from '../tags_selector';

export interface TagsFieldProps extends InputFieldProps {
    /** Input field value */
    value: string[];
    /** Called when the field changes */
    onChangeHandler?: (id: string, value: string[]) => any;
    /** A list of suggestions for tags input field */
    tagSuggestions?: string[];
    /** If true, the field will be focused when loaded */
    focusOnLoad?: boolean;
    /** html placeholder text */
    placeholder?: string;
}

export interface TagsFieldState {
    /** Indicates if the field has been touched (changed) or not from the default value. */
    touched: boolean;
}

/**
 * Class that adds an input wrapper around a TagsSelector component.
 * TODO: merge TagsField and TagsSelector?
 */
export class TagsField extends React.Component<TagsFieldProps, TagsFieldState> {
    constructor(props) {
        super(props);

        this.state = {
            touched: false,
        };
        this._onChange = this._onChange.bind(this);
    }

    private _onChange(value: string[]): void {
        const { onChangeHandler, id } = this.props;
        this.setState({ touched: true });
        onChangeHandler(id, value);
    }

    render() {
        const {
            placeholder, value, tagSuggestions, focusOnLoad, className, children, ...wrapperProps
        } = this.props;
        const { id, staticField } = wrapperProps;
        const { touched } = this.state;
        return (
            <InputFieldWrapper
                className={classNames(className, 'input-field--tags')}
                touched={touched}
                inputChildren={children}
                {...wrapperProps}
            >
                <TagsSelector
                    id={id}
                    onChangeHandler={this._onChange}
                    placeholder={placeholder}
                    suggestions={tagSuggestions}
                    value={Array.isArray(value) && value}
                    disabled={staticField}
                    autofocus={focusOnLoad}
                />
            </InputFieldWrapper>
        );
    }
}

export default TagsField;
