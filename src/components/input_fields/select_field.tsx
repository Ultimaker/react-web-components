// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

import InputFieldWrapper, { InputFieldProps } from './input_field_wrapper';
import { SelectList, SelectOption } from '../select_list';

export interface SelectFieldProps extends InputFieldProps {
    /** The value of the option currently selected */
    value: string | number;
    /** List of options for type select */
    selectOptions?: SelectOption[];
    /** Called when the field changes */
    onChangeHandler: (id: string, value: string | number) => any;
}

export interface SelectFieldState {
    /** Indicates if the field has been touched (changed) or not from the default value. */
    touched: boolean;
}

/**
 * Class that adds an input wrapper around a SelectList component.
 * TODO: Merge SelectField and SelectList?
 */
class SelectField extends React.Component<SelectFieldProps, SelectFieldState> {
    state = {
        touched: false,
    };

    constructor(props) {
        super(props);
        // bind callbacks once
        this._onChange = this._onChange.bind(this);
        this._staticRender = this._staticRender.bind(this);
    }

    private _onChange(value: string | number): void {
        const { onChangeHandler, id } = this.props;
        this.setState({ touched: true });
        onChangeHandler(id, value);
    }

    private _staticRender(): JSX.Element | string {
        const { value, selectOptions } = this.props;
        const option = selectOptions.find(findOption => findOption.value === value);
        return option && option.label;
    }

    render() {
        const {
            value, selectOptions, children, ...wrapperProps
        } = this.props;
        const {
            id, staticField, validationError, submitted,
        } = wrapperProps;
        const { touched } = this.state;
        return (
            <InputFieldWrapper touched={touched} inputChildren={children} {...wrapperProps}>
                { staticField
                    ? this._staticRender()
                    : (
                        <SelectList
                            id={id}
                            onChangeHandler={this._onChange}
                            value={typeof value === 'number' || typeof value === 'string' ? value : null}
                            options={selectOptions}
                            error={validationError && (touched || submitted)}
                        />
                    )
                }
            </InputFieldWrapper>
        );
    }
}

export default SelectField;
