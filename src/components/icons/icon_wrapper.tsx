import * as React from 'react';
import classNames from 'classnames';

export type IconSize = 'sm' | 'md' | 'lg';
export type IconColor = 'black' | 'blue' | 'red' | 'green' | 'orange' | 'grey' | 'white';

export interface IconWrapperProps {
    /** The size of the icon: 'sm' | 'md' | 'lg' */
    size?: IconSize;
    /** The color of the icon: 'black' | 'blue' | 'red' | 'green' | 'orange' | 'grey' | 'white' */
    color?: IconColor;
    borderColor?: IconColor;
}

export interface IconProps {
    className?: string;
}

/**
 * Creates classes based on the size and color props, and passes it to the wrapped svg as the className prop
 */
export function IconWrapper (Svg: React.StatelessComponent<IconProps>) {
    const Icon: React.StatelessComponent<IconWrapperProps> = ({ size, color, borderColor }): JSX.Element => {

        const sizeClass = `icon--${size}`;
        const colorClass = `icon--${color}`;
        const borderClass = `icon--border-${borderColor}`;
        const classes = classNames(
            'icon',
            { [sizeClass]: size },
            { [colorClass]: color },
            { [borderClass]: borderColor }
        );

        return <Svg className={classes} />
    };
    Icon.displayName = `Icon(${Svg.displayName})`;
    return Icon;
}

export default IconWrapper;
