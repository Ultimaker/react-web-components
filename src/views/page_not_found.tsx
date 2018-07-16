// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react'

// components
import Page from '../components/page'
import Tile from '../components/tile'

// utils
import { I18n } from '../utils/i18n'

export interface PageNotFoundViewProps {
    location: Location
}

export interface PageNotFoundViewState {
}

/**
 * The page not found view.
 */
export default class PageNotFoundView extends React.Component<PageNotFoundViewProps, PageNotFoundViewState> {
    render(): JSX.Element {
        return <Page title={I18n.translate("title page_not_found", "Page Not Found")} maxWidth={550}>
            <Tile padding="lg" align="center">
                <p>
                    {I18n.translate("page_not_found", "The page requested could not be found.")}
                </p>
                <pre>{this.props.location.pathname}</pre>
            </Tile>
        </Page>
    }
}
