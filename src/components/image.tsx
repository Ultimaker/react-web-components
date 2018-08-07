import * as React from 'react';

export type ImageShape = 'round' | 'square';

export interface ImageProps {
  /** the URL for the image */
  src: string;
  /** Shape of the image: 'round' | 'square' */
  shape?: ImageShape;
  /** Size of the image. Include size unit */
  size?: string;
}

export const Image: React.StatelessComponent<ImageProps> = ({ shape, src, size }) => {

  return (
    <img src={src} className={`image image--${shape}`} style={{ width: size, height: size }} />
  );
};

Image.defaultProps = {
  shape: 'round',
  size: '18rem'
};

Image.displayName = "Image";

export default Image;