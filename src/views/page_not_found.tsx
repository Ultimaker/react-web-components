// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

// components
import Page from '../components/page';
import Tile from '../components/tile';

export interface PageNotFoundViewProps {
    /** The location object */
    location: Location;
    /** The page title */
    titleText: string;
    /** The message to be displayed */
    messageText: string;
}

/**
 * The page not found view.
 */
export const PageNotFoundView: React.FC<PageNotFoundViewProps> = ({
    location, titleText, messageText,
}) => (
    <Page title={titleText} maxWidth={550}>
        <Tile padding="lg" align="center">
            <p>
                {messageText}
            </p>
            <pre>{location.pathname}</pre>
        </Tile>
    </Page>
);

PageNotFoundView.displayName = 'PageNotFoundView';

export default PageNotFoundView;
