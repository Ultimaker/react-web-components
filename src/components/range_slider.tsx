// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import classNames from 'classnames';

export interface RangeSliderProps {
    /** The minimum in the range */
    min?: number;

    /** The maximum in the range */
    max?: number;

    /** How big each step will be */
    step?: number;

    /** The current value */
    value: number;

    /** The name of the class to the element */
    className?: string;

    /** The on change handler */
    onChange: (value: number) => void;
}

/**
 * A range slider component that allows users to choose a number in a range.
 */
export const RangeSlider: React.StatelessComponent<RangeSliderProps> = ({
    min, max, step, className, onChange, value,
}) => (
    <div className={classNames('range-slider', className)}>
        <input
            name="scale"
            type="range"
            onChange={(e) => onChange(parseFloat(e.target.value))}
            min={min}
            max={max}
            step={step}
            defaultValue={value && value.toString()}
        />
    </div>
);

RangeSlider.displayName = 'RangeSlider';
RangeSlider.defaultProps = {
    min: 0,
    max: 1,
    value: 0.5,
    step: 0.1,
};

export default RangeSlider;
