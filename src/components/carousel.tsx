// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import AliceCarousel from 'react-alice-carousel';
import {Breakpoint, BreakpointNames, BreakpointSizes} from '../utils/layout_constants'
import Grid from './grid'
import GridItem from './grid_item'
import classNames = require('classnames')

/**
 * The props of this component.
 */
export interface CarouselProps {
    /**
     * An array of the amount of items to show depending on each breakpoint [xs, sm, md, lg].
     * The items are assumed to be in ascending order.
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
export default class Carousel extends React.Component<CarouselProps, {}> { // no state, but a class for readability.
    /**
     * The default props of the carousel.
     */
    static defaultProps = {
        autoPlayInterval: 5000,
        transitionDuration: 1000,
    };

    /**
     * Creates an object that is used to configure how many items should be shown in the carousel for a given minimum
     * screen width.
     * @return - An object with the format {breakpointWidth: {items: item_count}}.
     * @private
     */
    private _getResponsiveConfiguration(): {[breakpoint: number]: {items: number}} {
        const { itemCounts } = this.props;
        // create an object with the format .
        const responsive = {};
        BreakpointSizes.forEach((breakpoint, index) => {
            const itemCount = itemCounts.length > index ? itemCounts[index] : itemCounts[itemCounts.length - 1];
            responsive[breakpoint] = { items: itemCount };
        });
        return responsive;
    }

    /**
     * Calculates at which breakpoint we have too few items to fit the screen.
     * @param responsive - The responsive configuration for alice carousel, as returned by _getResponsiveConfiguration.
     * @return The name of the breakpoint.
     * @private
     */
    private _getBreakpoint(responsive): Breakpoint | undefined {
        const { children } = this.props;
        const childrenCount = React.Children.count(children);
        const breakpointIndex = BreakpointSizes.findIndex(breakpoint =>
            childrenCount <= responsive[breakpoint].item_count
        );
        if (breakpointIndex >= 0) {
            return BreakpointNames[breakpointIndex];
        }
    }

    /**
     * Renders the carousel. Depending on how large the screen is, we may have too few items for the carousel.
     * In that case we will render a fixed Grid too, which will be displayed depending on the window width breakpoints.
     */
    render() {
        const responsive = this._getResponsiveConfiguration();
        const breakpoint = this._getBreakpoint(responsive);

        // We render both a grid and a carousel. Via CSS we decide which one to show with which breakpoint.
        return <div className="carousel">
            {breakpoint && this._renderGrid(breakpoint)}
            {this._renderCarousel(responsive, breakpoint)}
        </div>;
    }

    /**
     * Renders a fixed grid, to be displayed in a given screen width when we don't have enough items to display.
     * @param breakpoint - The window width breakpoint after the grid should be displayed.
     * @private
     */
    private _renderGrid(breakpoint: Breakpoint) {
        const { children } = this.props;
        return (
            <Grid align="center" className={classNames('carousel__fixed', breakpoint)}>
                {React.Children.map(children, child => React.isValidElement(child) &&
                    <GridItem layoutWidth="fit">{child}</GridItem>)
                }
            </Grid>
        );
    }

    /**
     * Renders a carousel, to be displayed whenever we have enough items to display.
     * @param responsive - The responsive configuration for alice carousel, as returned by _getResponsiveConfiguration.
     * @param breakpoint - The window width breakpoint before the carousel should be hidden. If null, the carousel will
     * always be shown.
     * @private
     */
    private _renderCarousel(responsive, breakpoint: Breakpoint | null): JSX.Element {
        const { autoPlayInterval, transitionDuration, children } = this.props;
        return (
            <div className={classNames('carousel__carousel', breakpoint && "show-" + breakpoint)}>
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
        );
    }
}
