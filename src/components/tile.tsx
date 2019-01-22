import * as React from 'react';
import classnames from 'classnames';

export type Padding = 'none' | 'sm' | 'md' | 'lg';
export type Align = 'left' | 'center' | 'right';
export type TileAppearance = 'shadow' | 'dashed' | 'flat';

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
    /** An optional class name for the tile * */
    className?: string;
    /** CSS styling: 'shadow' | 'dashed' | 'flat' */
    appearance?: TileAppearance;
    /** Border radius. Include unit */
    radius?: string;
}

export const Tile: React.StatelessComponent<TileProps> = ({
    padding, align, children, disabled, selected, alert, success, className, appearance, radius,
}): JSX.Element => {
    const classes = classnames('tile', className, `padding-${padding}`, `tile--${appearance}`, {
        'tile--selected': selected,
        'tile--alert': alert,
        'tile--disabled': disabled,
        'tile--success': success,
    });

    return (
        <div className={classes} style={{ textAlign: align, borderRadius: radius }}>
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
