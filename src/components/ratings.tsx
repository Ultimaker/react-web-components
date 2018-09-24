// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import {IconWrapperProps} from './icons/icon_wrapper';
import _ = require('lodash');

export interface RatingsProps {
    max: number;
    rating: number;
    formatDecimals?: number;
    Icon: React.StatelessComponent<IconWrapperProps>;
}

export const Ratings: React.StatelessComponent<RatingsProps> = ({ max, rating, formatDecimals = 2, Icon }) => {
    return (
        <div className="ratings" title={rating.toFixed(formatDecimals) + " / " + max.toFixed(formatDecimals)}>
            <div className="ratings--background">
                {_.times(max, i => <Icon key={i} color="grey" />)}
            </div>
            <div className="ratings--foreground" style={{width: (100 * rating / max) + "%"}}>
                {_.times(max, i => <Icon key={i} color="orange" />)}
            </div>
        </div>
    );
};

Ratings.displayName = "Ratings";

export default Ratings;
