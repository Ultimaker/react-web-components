import * as React from 'react';

export type Size = 'sm' | 'md' | 'lg';
export type Color = 'black' | 'blue' | 'red' | 'green' | 'orange' | 'grey';

export interface IconWrapperProps {
    /** The size of the icon: 'sm' | 'md' | 'lg' */
    size?: Size;
    /** The color of the icon: 'black' | 'blue' | 'red' | 'green' | 'orange' | 'grey' */
    color?: Color;
}

interface PropsWithClassName {
    className?: string;
}

function IconWrapper<T extends PropsWithClassName> (Svg: React.StatelessComponent<T>) {
    return function Icon({
        size = 'sm',
        color = 'black',
    }: IconWrapperProps): JSX.Element {
        return (
            <Svg className={`icon icon--${size} icon--${color}`} />
        )
    }
}

export default IconWrapper;
