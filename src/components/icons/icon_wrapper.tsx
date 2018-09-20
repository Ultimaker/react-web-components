import * as React from 'react';
import classNames from 'classnames';

export type IconSize = 'sm' | 'md' | 'lg';
export type IconColor = 'black' | 'blue' | 'red' | 'green' | 'orange' | 'grey' | 'white';

export interface IconWrapperProps {
    /** The size of the icon: 'sm' | 'md' | 'lg' */
    size?: IconSize;
    /** The color of the icon: 'black' | 'blue' | 'red' | 'green' | 'orange' | 'grey' | 'white' */
    color?: IconColor;
}

export interface IconProps {
    className?: string;
}

/**
 * Creates classes based on the size and color props, and passes it to the wrapped svg as the className prop
 * @param size - The size of the icon.
 * @param color - The color of the icon.
 */
export function IconWrapper (Svg: React.StatelessComponent<IconProps>) {
    const Icon: React.StatelessComponent<IconWrapperProps> = ({ size, color }): JSX.Element => {

        const sizeClass = `icon--${size}`;
        const colorClass = `icon--${color}`;
        const classes = classNames('icon', { [sizeClass]: size }, { [colorClass]: color });

        return <Svg className={classes} />
    };
    Icon.displayName = `Icon(${Svg.displayName})`;
    return Icon;
}

export default IconWrapper;
