// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import {IconColor, IconSize, IconWrapperProps} from './icons/icon_wrapper'
import _ = require('lodash');

export interface RatingsProps {
    max: number;
    rating: number | null;
    Icon: React.StatelessComponent<IconWrapperProps>;
    size?: IconSize;
    foregroundColor?: IconColor;
    backgroundColor?: IconColor;
}

/**
 * The ratings component shows the ratings score of an object.
 * @param max - The maximum rating allowed (integer).
 * @param rating - The actual rating of the object.
 * @param Icon - The icon class to use. It should be wrapped by `IconWrapper`.
 * @param foregroundColor - The color of the foreground icons. Defaults to 'orange'.
 * @param backgroundColor - The color of the background icons. Defaults to 'grey'.
 * @param size - The size of the icons. Defaults to 'sm' (small).
 * @constructor
 */
export const Ratings: React.StatelessComponent<RatingsProps> = (
    { max, rating, Icon, foregroundColor, backgroundColor, size }
) => {
    return (
        <div className="ratings">
            <div className="ratings--background">
                {_.times(max, i => <Icon key={i} color={backgroundColor} size={size} />)}
            </div>
            {rating > 0 &&
                <div className="ratings--foreground" style={{width: (100 * rating / max) + "%"}}>
                    {_.times(max, i => <Icon key={i} color={foregroundColor} size={size} />)}
                </div>
            }
        </div>
    );
};

Ratings.defaultProps = {
    foregroundColor: "orange",
    backgroundColor: "grey",
    size: 'sm',
};
Ratings.displayName = "Ratings";

export default Ratings;
