import * as React from 'react';
import classnames from 'classnames';

export type Padding = 'none' | 'sm' | 'md' | 'lg';
export type Align = 'left' | 'center' | 'right';

export interface TileProps {
    /** The amount of padding to apply: 'none' | 'sm' | 'md' | 'lg' */
    padding?: Padding;
    /** The alignment of the tile content: 'left' | 'center' | 'right' */
    align?: Align;
    /** The tile will be displayed in a disabled state when true */
    disabled?: boolean;
    /** The tile will be displayed in a selected state when true */
    selected?: boolean;
    /** The tile will be displayed in an alert state when true */
    alert?: boolean;
    /** The tile will be displayed in an success state when true */
    success?: boolean;
}

export const Tile: React.StatelessComponent<TileProps> =
    ({ padding, align, children, disabled, selected, alert, success }): JSX.Element => {

        const classes = classnames('tile', `padding-${padding}`, { selected, alert, disabled, success });

        return <div className={classes} style={{ textAlign: align }}>
            <div className="cover" />
            {children}
        </div>
    }

Tile.defaultProps = {
    padding: 'md',
    align: 'left'
}

Tile.displayName = "Tile";

export default Tile;
