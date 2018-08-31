import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';

import BaseApp, { BaseAppRoute } from '../layouts/base_app';
import Page from '../components/page';

const stories = storiesOf('Example layouts', module);

/**
 * Example app for storybook.
 */
class StoriesApp extends BaseApp {

    protected _fetchScopes(): void {
        this._setAuth([]);
    }

    protected _getAppUrl(): string {
        return "/app";
    }

    protected _getLoginUrl(): string {
        return '/Sign In'
    }

    protected _getRoutes(): BaseAppRoute[] {
        return [{
            path: '/home',
            label: 'Home',
            visible: true,
            component: Page
        }]
    }
}

stories.addDecorator(withKnobs);

stories.add('Base App', withInfo(
    'A example layout for an application'
)(() =>
    <BrowserRouter>
        <StoriesApp />
    </BrowserRouter>
));
