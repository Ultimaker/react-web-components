import * as React from 'react';
import classnames from 'classnames';

export type TilePadding = 'none' | 'sm' | 'md' | 'lg';
export type TileAlign = 'left' | 'center' | 'right';
export type TileAppearance = 'shadow' | 'dashed' | 'flat';

export interface TileProps {
    /** The amount of padding to apply: 'none' | 'sm' | 'md' | 'lg' */
    padding?: TilePadding;
    /** The alignment of the tile content: 'left' | 'center' | 'right' */
    align?: TileAlign;
    /** The tile will be displayed in a disabled state when true */
    disabled?: boolean;
    /** The tile will be displayed in a selected state when true */
    selected?: boolean;
    /** The tile will be displayed in an alert state when true */
    alert?: boolean;
    /** The tile will be displayed in an success state when true */
    success?: boolean;
    /** An optional class name for the tile * */
    className?: string;
    /** An optional id for the tile * */
    id?: string;
    /** CSS styling: 'shadow' | 'dashed' | 'flat' */
    appearance?: TileAppearance;
    /** Border radius. Include unit */
    radius?: string;
}

export const Tile: React.StatelessComponent<TileProps> = ({
    padding, align, children, disabled, selected, alert, success, className, appearance, radius, id,
}): JSX.Element => {
    const classes = classnames('tile', className, `padding-${padding}`, `tile--${appearance}`, {
        'tile--selected': selected,
        'tile--alert': alert,
        'tile--disabled': disabled,
        'tile--success': success,
    });

    return (
        <div id={id} className={classes} style={{ textAlign: align, borderRadius: radius }}>
            <div className="cover" />
            {children}
        </div>
    );
};

Tile.defaultProps = {
    padding: 'md',
    align: 'left',
    appearance: 'shadow',
};

Tile.displayName = 'Tile';

export default Tile;
