// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

import InputFieldWrapper, { InputFieldProps } from './input_field_wrapper';
import DropDownMenu from '../drop_down_menu';
import DropDownMenuItem from '../drop_down_menu_item';

export interface SelectOption {
    label: string,
    value: string | number,
    disabled?: boolean
}

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

export class SelectField extends React.Component<SelectFieldProps, SelectFieldState> {
    constructor(props) {
        super(props);

        this.state = {
            touched: false,
        };
        this._onChange = this._onChange.bind(this);
        this._getValueLabel = this._getValueLabel.bind(this);
    }

    private _onChange(value: string | number): void {
        const { onChangeHandler, id } = this.props;
        this.setState({ touched: true });
        onChangeHandler(id, value);
    }

    private _getValueLabel(value: string | number): string {
        const { selectOptions } = this.props;
        const option = selectOptions.find((findOption) => findOption.value === value);

        if (option) {
            return option.label;
        }
        return null;
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
                    ? this._getValueLabel(value)
                    : (
                        <DropDownMenu
                            id={id}
                            activeLabel={this._getValueLabel(value)}
                            error={validationError && (touched || submitted)}
                        >
                            {selectOptions.map((option, index) => (
                                <DropDownMenuItem
                                    key={index}
                                    onClickHandler={() => this._onChange(option.value)}
                                    active={value === option.value}
                                    disabled={option.disabled}
                                >
                                    {option.label}
                                </DropDownMenuItem>
                            ))}
                        </DropDownMenu>
                    )}
            </InputFieldWrapper>
        );
    }
}

export default SelectField;
