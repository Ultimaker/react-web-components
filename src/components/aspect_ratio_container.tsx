import * as React from 'react';
import classNames = require('classnames');

export interface aspectRatioContainerProps {
    /** only accepts a single child */
    children: JSX.Element;
    /** given as a fraction, for example 16/9 */
    aspectRatio?: number;
    /** An optional id for the container **/
    id?: string;
    /** An optional class name for the container **/
    className?: string;
}

/**
 * returns a copy of the content with modified classes, wrapped in containers to manage it's size
 */
export const aspectRatioContainer: React.StatelessComponent<aspectRatioContainerProps> = ({ aspectRatio, className, id, children }) => {

    const containerClasses = classNames('aspect-ratio-container', className);
    const bottomPadding = 1 / aspectRatio * 100 + '%';

    function _renderChild(child: JSX.Element): JSX.Element {
        const contentClasses = classNames('aspect-ratio-container__content', child.props.className);
        return React.cloneElement(
            child,
            { className: contentClasses }
        )
    }

    return (
        <div id={id} className={containerClasses}>
            <div className='aspect-ratio-container__height-setter' style={{ paddingBottom: bottomPadding }}>
                {children && _renderChild(children)}
            </div>
        </div>
    );
};

aspectRatioContainer.defaultProps = {
    aspectRatio: 16 / 9
};

aspectRatioContainer.displayName = "AspectRatioContainer";

export default aspectRatioContainer;
