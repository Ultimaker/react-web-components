// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import AliceCarousel from 'react-alice-carousel';
import { BreakpointNames, BreakpointSizes } from '../utils/layout_constants'
import Grid from './grid'
import GridItem from './grid_item'
import classNames = require('classnames')

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
    const responsive = {};
    const gridClasses = ['carousel__fixed'];
    const carouselClasses = ['carousel__carousel'];
    const childrenCount = React.Children.count(children);
    let renderGrid = false;
    BreakpointSizes.forEach((breakpoint, index) => {
        const itemCount = itemCounts.length > index ? itemCounts[index] : itemCounts[itemCounts.length - 1];
        responsive[breakpoint] = { items: itemCount };
        if (!renderGrid && childrenCount <= itemCount) {
            renderGrid = true;
            carouselClasses.push('show-' + BreakpointNames[index])
            gridClasses.push('hide-' + BreakpointNames[index]);
        }
    });

    // We render both a grid and a carousel. Via CSS we decide which one to show with which breakpoint.
    return <div className="carousel">
        {renderGrid && <Grid align="center" className={classNames(gridClasses)}>
            {React.Children.map(children, child => React.isValidElement(child) &&
                <GridItem layoutWidth="fit">{child}</GridItem>)
            }
        </Grid>}
        <div className={classNames(carouselClasses)}>
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
            </AliceCarousel>
        </div>
    </div>;
}

Carousel.defaultProps = {
    autoPlayInterval: 5000,
    transitionDuration: 1000,
};

Carousel.displayName = 'Carousel';

export default Carousel;
