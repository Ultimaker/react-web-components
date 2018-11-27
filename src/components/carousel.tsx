// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import _ = require('lodash')
import AliceCarousel from 'react-alice-carousel';
import {BreakpointSizes} from '../utils/layout_constants';
import Grid from './grid'
import GridItem from './grid_item'

/**
 * The props of this component.
 */
export interface CarouselProps {
    /**
     * An array of the amount of items to show depending on each breakpoint [xs, sm, md, lg].
     * If not enough children are given, a fixed grid will be displayed instead.
     **/
    itemCounts: number[];

    /** A list of items to be displayed **/
    children: any;

    /** How often the auto play should run **/
    autoPlayInterval?: number;

    /** Duration of slides transition (milliseconds) */
    transitionDuration?: number;
}

/**
 * A carousel component.
 */
export const Carousel: React.StatelessComponent<CarouselProps> = ({ children, itemCounts, autoPlayInterval, transitionDuration }) => {
    // create an object with the format {breakpointWidth: {items: item_count}}.
    const responsive = _.zipObject(BreakpointSizes.slice(0, itemCounts.length), itemCounts.map(items => ({items})));

    // renders a grid without any carousel features, in case we don't have enough items in the carousel.
    const renderGrid = () =>
        <Grid align="center" className="carousel__fixed">
            {React.Children.map(children, child => React.isValidElement(child) &&
                <GridItem layoutWidth="fit">{child}</GridItem>)
            }
        </Grid>;

    const renderCarousel = () =>
        <AliceCarousel
            mouseDragEnabled
            autoPlay={autoPlayInterval > 0}
            buttonsDisabled
            duration={transitionDuration}
            autoPlayInterval={autoPlayInterval}
            responsive={responsive}
        >
            {React.Children.map(children, child =>
                React.isValidElement(child) && React.cloneElement(child, {onDragStart: e => e.preventDefault()} as any))
            }
        </AliceCarousel>;

    // choose which
    const breakpoint = Math.max(...BreakpointSizes.filter(bp => bp <= innerWidth && responsive[bp]));
    return responsive[breakpoint].items >= React.Children.count(children) ? renderGrid() : renderCarousel();
}

Carousel.defaultProps = {
    autoPlayInterval: 5000,
    transitionDuration: 1000,
};

Carousel.displayName = 'Carousel';

export default Carousel;
