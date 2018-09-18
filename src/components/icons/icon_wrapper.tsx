import * as React from 'react';

export type Size = 'sm' | 'md' | 'lg';
export type Color = 'black' | 'blue' | 'red' | 'green' | 'orange' | 'grey';

export interface IconWrapperProps {
    /** The size of the icon: 'sm' | 'md' | 'lg' */
    size?: Size;
    /** The color of the icon: 'black' | 'blue' | 'red' | 'green' | 'orange' | 'grey' */
    color?: Color;
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
    const Icon: React.StatelessComponent<IconWrapperProps> = ({ size, color }): JSX.Element => (
        <Svg className={`icon icon--${size} icon--${color}`} />
    );
    Icon.displayName = `Icon(${Svg.displayName})`;
    return Icon;
}

export default IconWrapper;
