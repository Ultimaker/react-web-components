// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { IconColor, IconSize, IconWrapperProps } from './icons/icon_wrapper'
import _ = require('lodash');

export interface RatingsProps {
    /* The maximum rating allowed (integer). */
    max: number;
    /* The actual rating of the object. */
    rating: number | null;
    /* The icon class to use. It should be wrapped by `IconWrapper`. */
    Icon: React.StatelessComponent<IconWrapperProps>;
    /* The size of the icons. Defaults to 'sm' (small). */
    size?: IconSize;
    /* The color of the foreground icons. Defaults to 'orange'. */
    foregroundColor?: IconColor;
    /* The border color of the foreground icons. Defaults to foregroundColor. */
    foregroundBorder?: IconColor | null;
    /* The color of the background icons. Defaults to 'grey'. */
    backgroundColor?: IconColor;
    /* The border color of the background icons. Defaults to backgroundColor. */
    backgroundBorder?: IconColor | null;
}

/**
 * The ratings component shows the ratings score of an object.
 * @constructor
 */
export const Ratings: React.StatelessComponent<RatingsProps> = (
    { max, rating, Icon, foregroundColor, foregroundBorder, backgroundColor, backgroundBorder, size }
) => {
    return (
        <div className="ratings">
            <div className="ratings__background layout layout--align-middle layout--gutter-xs">
                {_.times(max, i =>
                    <div className="layout__item u-fit" key={i}>
                        <Icon color={backgroundColor}
                            borderColor={backgroundBorder || backgroundColor}
                            size={size} />
                    </div>
                )}
            </div>
            {rating > 0 &&
                <div className="ratings__foreground" style={{ width: (100 * rating / max) + "%" }}>
                    {_.times(max, i =>
                        <div className="ratings__foreground-icon" key={i}>
                            <Icon color={foregroundColor}
                                borderColor={foregroundBorder || foregroundColor}
                                size={size} />
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

Ratings.defaultProps = {
    foregroundColor: "orange",
    foregroundBorder: null,
    backgroundColor: "grey",
    backgroundBorder: null,
    size: 'sm',
};
Ratings.displayName = "Ratings";

export default Ratings;
