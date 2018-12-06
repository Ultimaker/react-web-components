// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Breakpoint, BreakpointNames, BreakpointSizes } from '../utils/layout_constants';
import Grid from './grid';
import GridItem from './grid_item';

import classNames = require('classnames')

/**
 * The props of this component.
 */
export interface CarouselProps {
    /**
     * An array of the amount of items to show depending on each breakpoint [xs, sm, md, lg].
     * The items are assumed to be in ascending order.
     * If not enough children are given, a fixed grid will be displayed instead.
     */
    itemCounts: number[];

    /** A list of items to be displayed */
    children: any;

    /** How often the auto play should run */
    autoPlayInterval?: number;

    /** Duration of slides transition (milliseconds) */
    transitionDuration?: number;

    /** A list of breakpoint sizes for the breakpoints 'xs', 'sm', 'md', 'lg' */
    breakpointSizes?: number[];
}

/**
 * Type used to configure how many items should be shown in
 * the carousel for a given minimum screen width.
 */
type ResponsiveConfiguration = { [breakpoint: number]: { items: number } };

/**
 * A carousel component.
 */
export default class Carousel extends React.Component<CarouselProps, {}> {
    /**
     * The default props of the carousel.
     */
    static defaultProps = {
        autoPlayInterval: 5000,
        transitionDuration: 1000,
        breakpointSizes: BreakpointSizes,
    };

    /**
     * Creates an object that is used to configure how many items should be shown
     * in the carousel for a given minimum screen width.
     * @return - An object with the format {breakpointWidth: {items: item_count}}.
     * @private
     */
    private _getResponsiveConfiguration(): ResponsiveConfiguration {
        const { itemCounts, breakpointSizes } = this.props;
        // create an object with the format .
        const responsive = {};
        breakpointSizes.forEach((breakpoint, index) => {
            // minus 1 to fix bug in AliceCarousel that applies the breackpoint 1px to early
            const fixedBreakpoint = breakpoint > 0 ? breakpoint - 1 : breakpoint;
            const itemCount = itemCounts.length > index
                ? itemCounts[index]
                : itemCounts[itemCounts.length - 1];
            responsive[fixedBreakpoint] = { items: itemCount };
        });
        return responsive;
    }

    /**
     * Calculates at which breakpoint we have too few items to display the carousel.
     * @return The name of the breakpoint.
     * @private
     */
    private _getBreakpoint(): Breakpoint {
        const { itemCounts, children } = this.props;
        const childrenCount = React.Children.count(children);
        const breakpointIndex = itemCounts.findIndex(count => childrenCount <= count);
        if (breakpointIndex >= 0) {
            return BreakpointNames[breakpointIndex];
        }
        return null;
    }

    /**
     * Renders a fixed grid, to be displayed in a given screen width when
     * we don't have enough items to display the carousel.
     * @param responsive - The responsive configuration for alice carousel,
     * as returned by _getResponsiveConfiguration.
     * @param breakpoint - The window width breakpoint after the grid should be displayed.
     * @private
     */
    private _renderGrid(responsive: ResponsiveConfiguration, breakpoint: Breakpoint): JSX.Element {
        const { children } = this.props;
        if (!breakpoint) {
            // we have enough carousel items to show the carousel at all screen widths,
            // so we don't need to render a grid.
            return null;
        }
        return (
            <Grid align="center" className={classNames('carousel__fixed', `show-${breakpoint}`)}>
                {React.Children.map(children, child => React.isValidElement(child)
                    && <GridItem layoutWidth="fit">{child}</GridItem>)
                }
            </Grid>
        );
    }

    /**
     * Renders a carousel, to be displayed whenever we have enough items to display it.
     * @param responsive - The responsive configuration for alice carousel,
     * as returned by _getResponsiveConfiguration.
     * @param breakpoint - The window width breakpoint before the carousel should be hidden.
     * If null, the carousel will always be shown.
     * @private
     */
    private _renderCarousel(
        responsive: ResponsiveConfiguration,
        breakpoint: Breakpoint,
    ): JSX.Element {
        const { autoPlayInterval, transitionDuration, children } = this.props;
        if (breakpoint === 'xs') {
            // we don't have enough carousel items at any screen width,
            // so we don't need to render it at all.
            return null;
        }
        const extraProps = { onDragStart: e => e.preventDefault() };
        return (
            <div className={classNames('carousel__carousel', breakpoint && `hide-${breakpoint}`)}>
                <AliceCarousel
                    mouseDragEnabled
                    autoPlay={autoPlayInterval > 0}
                    buttonsDisabled
                    duration={transitionDuration}
                    autoPlayInterval={autoPlayInterval}
                    responsive={responsive}
                >
                    {React.Children.map(children, child => React.isValidElement(child)
                        && React.cloneElement(child, extraProps))
                    }
                </AliceCarousel>
            </div>
        );
    }

    /**
     * Render both a grid and a carousel. Via CSS we decide which one to show at which breakpoint
     * based on the number of items we have to show.
     */
    render() {
        const responsive = this._getResponsiveConfiguration();
        const breakpoint = this._getBreakpoint();

        return (
            <div className="carousel">
                {this._renderGrid(responsive, breakpoint)}
                {this._renderCarousel(responsive, breakpoint)}
            </div>
        );
    }
}
