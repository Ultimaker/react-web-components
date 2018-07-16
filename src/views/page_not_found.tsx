// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react'

// components
import Page from '../components/page'
import Tile from '../components/tile'

// utils
import { I18n } from '../utils/i18n'

/**
 * The page not found view.
 */
export class PageNotFoundView extends React.Component<LoginViewProps, LoginViewState> {
    render(): JSX.Element {
        return <Page title={I18n.translate("title page_not_found", "Page Not Found")} maxWidth={550}>
            <Tile padding="lg" align="center">
                <p>
                    {I18n.translate("page_not_found", "The page could not be found.")}
                    {this.props.location}
                </p>
            </Tile>
        </Page>
    }
}
