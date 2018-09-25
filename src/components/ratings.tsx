// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import {IconColor, IconWrapperProps} from './icons/icon_wrapper'
import _ = require('lodash');

export interface RatingsProps {
    max: number;
    rating: number | null;
    Icon: React.StatelessComponent<IconWrapperProps>;
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
 * @constructor
 */
export const Ratings: React.StatelessComponent<RatingsProps> = (
    { max, rating, Icon, foregroundColor = "orange", backgroundColor = "grey" }
) => {
    return (
        <div className="ratings">
            <div className="ratings--background">
                {_.times(max, i => <Icon key={i} color={backgroundColor} />)}
            </div>
            {rating &&
                <div className="ratings--foreground" style={{width: (100 * rating / max) + "%"}}>
                    {_.times(max, i => <Icon key={i} color={foregroundColor}/>)}
                </div>
            }
        </div>
    );
};

Ratings.displayName = "Ratings";

export default Ratings;
