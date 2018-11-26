// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import AliceCarousel from 'react-alice-carousel';

/**
 * The props of this component.
 */
export interface CarouselProps {
    /** The amount of items to show from a minimum width, with the format {breakpointWidth: {items: item_count}} **/
    responsive: {[breakpointWidth: number]: {items: number}};

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
export const Carousel: React.StatelessComponent<CarouselProps> = ({ children, responsive, autoPlayInterval, transitionDuration }) => {
    // each child will receive the given extra parameter
    const extraProps = {onDragStart: e => e.preventDefault()};

    return (
        <AliceCarousel
            mouseDragEnabled
            autoPlay={autoPlayInterval > 0}
            buttonsDisabled
            duration={transitionDuration}
            autoPlayInterval={autoPlayInterval}
            responsive={responsive}
        >
            {React.Children.map(children, child =>
                React.isValidElement(child) && React.cloneElement(child, extraProps))
            }
        </AliceCarousel>
    );
}

Carousel.defaultProps = {
    autoPlayInterval: 5000,
    transitionDuration: 1000,
};

Carousel.displayName = 'Carousel';

export default Carousel;
