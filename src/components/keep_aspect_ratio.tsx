import * as React from 'react';
import classNames = require('classnames');

export interface keepAspectRatioProps {
    /** the content to be sized appropriately  */
    content: JSX.Element;
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
export const keepAspectRatio: React.StatelessComponent<keepAspectRatioProps> = ({ aspectRatio, className, id, content }) => {

    const containerClasses = classNames('keep-aspect-ratio', className);
    const bottomPadding = 1 / aspectRatio * 100 + '%';
    const contentClasses = classNames('keep-aspect-ratio__content', content.props.className);
    const updatedContent = React.cloneElement(
        content,
        { className: contentClasses }
    )

    return (
        <div id={id} className={containerClasses}>
            <div className='keep-aspect-ratio__height-setter' style={{ paddingBottom: bottomPadding }}>
                {updatedContent}
            </div>
        </div>
    );
};

keepAspectRatio.defaultProps = {
    aspectRatio: 16 / 9
};


export default keepAspectRatio;
