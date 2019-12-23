import * as React from 'react';

import classNames = require('classnames');

export type ImageShape = 'round' | 'square';

export interface ImageProps {
    /** the URL for the image */
    src: string;
    /** Shape of the image: 'round' | 'square' */
    shape?: ImageShape;
    /** Size of the image. Include size unit */
    size?: string;
    /** An optional ID for the image */
    id?: string;
    /** An optional class name for the image */
    className?: string;
    /** image alt */
    alt?: string;
    /** image title */
    title?: string;
}

export const Image: React.FC<ImageProps> = ({
    shape, src, size, id, className, alt, title,
}) => {
    const classes = classNames(`image image--${shape}`, className);
    return (
        <img
            id={id}
            src={src}
            alt={alt}
            title={title}
            className={classes}
            style={{ width: size, height: size }}
        />
    );
};

Image.defaultProps = {
    shape: 'round',
    size: '18rem',
};

Image.displayName = 'Image';

export default Image;
