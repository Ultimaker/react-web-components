// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import Grid, {Align, GridProps, Gutter, Position} from './grid'
import GridItem, {Breakpoint, LayoutWidth} from './grid_item'
import CircleIcon from './icons/circle_icon'

export interface CarouselProps {
    /** The amount of items to show per time; limited to the LayoutWidth options */
    showItems: 1 | 2 | 3 | 4 | 5;

    /** Breakpoint at which the widthFraction will be applied: 'xs' | 'sm' | 'md' | 'lg' */
    breakpoint?: Breakpoint;

    /** Alignment (horizontal) of the grid items: 'left' | 'center' | 'right' */
    align?: Align;

    /** Position (vertical) of the grid items: 'top' | 'middle' | 'bottom' */
    position?: Position;

    /** Gutter size between the grid items: 'xs' | 'sm' | 'md' | 'lg' | 'none' */
    gutter?: Gutter;

    /** An optional class name for the grid **/
    className?: string;

    /** Size of the icon. Include unit */
    size?: string;
}

export interface CarouselState {
    page: number;
}

export default class Carousel extends React.Component<CarouselProps, CarouselState> {
    state = {
        page: 0,
    };

    constructor(props) {
        super(props)
        this._renderChild = this._renderChild.bind(this);
    }

    private _renderChild(child: JSX.Element, index: number): JSX.Element {
        const { breakpoint, showItems } = this.props;
        const layoutWidth = ("1/" + showItems.toString()) as LayoutWidth;
        return (
            <GridItem key={index} layoutWidth={layoutWidth} breakpoint={breakpoint}>
                {child}
            </GridItem>
        );
    }

    private _onClick(page: number) {
        this.setState({ page })
    }

    render() {
        const { children, showItems, align, gutter, position, className  } = this.props;
        const { page } = this.state;
        const childrenArray = React.Children.toArray(children);
        const start = showItems * page;
        const end = start + showItems;
        const pageCount = Math.ceil(childrenArray.length / showItems);
        return (
            <Grid align={align} gutter={gutter} position={position} className={className}>
                {childrenArray.slice(start, end).map(this._renderChild)}
                <GridItem layoutWidth="1/1">
                    <Grid align={align} gutter="sm">
                        {Array.from(Array(pageCount).keys()).map(p =>
                            <GridItem key={p} layoutWidth="fit">
                                <span onClick={() => this._onClick(p)}>
                                    <CircleIcon
                                        size="sm"
                                        color={p === page ? "blue" : "white"}
                                        borderColor={p === page ? "blue" : "grey"}
                                        key={p}
                                    />
                                </span>
                            </GridItem>
                        )}
                    </Grid>
                </GridItem>
            </Grid>
        );
    }
}
