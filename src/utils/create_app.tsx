// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';

import { I18n } from '../utils/i18n';

declare const module: any;

/**
 * Create a standard app.
 * @param domId The DOM element on which to render the app.
 * @param appComponent The main application component to generate the app with.
 * @param localesPath The directory location of the translation files.
 */
export function createApp(domId: string, AppComponent, localesPath: string) {
    
    // Set locale
    let locale = I18n.getLocale();
    console.info('locale', locale);
    I18n.setMomentLocale(locale);

    I18n.load({
        path: localesPath,
        locale: locale,
        complete: () => {
            _renderApp(domId, AppComponent);
        }
    });

    // Hot Module Replacement API
    if (module.hot) {
        module.hot.accept(() => {
            _renderApp(domId, AppComponent);
        })
    }
}

/**
 * Render a standard app.
 * @param domId The DOM element on which to render the app.
 * @param appComponent The root app component.
 */
function _renderApp(domId: string, AppComponent) {
    ReactDOM.render(
        <AppContainer>
            <BrowserRouter>
                <AppComponent />
            </BrowserRouter>
        </AppContainer>, document.getElementById(domId)
    )
}
