// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import classNames from 'classnames';
import InputFieldWrapper, {InputFieldProps} from './input_field_wrapper';
import Checkbox from '../checkbox';


interface CheckboxFieldProps extends InputFieldProps {
    /** Whether the checkbox is selected **/
    value: boolean;
    /** Called when the field changes */
    onChangeHandler: (id: string, value: boolean) => any;
}

export interface CheckboxFieldState {
    /** Indicates if the field has been touched (changed) or not from the default value. */
    touched: boolean;
}

/**
 * Class that adds an input wrapper around a Checkbox component.
 * TODO: merge the two components
 */
class CheckboxField extends React.Component<CheckboxFieldProps, CheckboxFieldState> {
    state = {
        touched: false
    }

    constructor(props) {
        super(props);
        // bind callbacks once
        this._onChange = this._onChange.bind(this);
    }

    private _onChange(value: boolean): void {
        this.setState({touched: true});
        this.props.onChangeHandler(this.props.id, value);
    }

    render() {
        const {value, className, labelLayoutWidth, ...wrapperProps} = this.props;
        const {id, staticField} = wrapperProps;
        const {touched} = this.state;
        return (
            <InputFieldWrapper
                touched={touched}
                className={classNames(className, "input-field--checkbox")}
                labelLayoutWidth="fill"
                {...wrapperProps}>
                <Checkbox
                    id={id}
                    onChangeHandler={this._onChange}
                    value={value === true}
                    disabled={staticField}
                />
            </InputFieldWrapper>
        );
    }
}

export default CheckboxField
