import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs  } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';

import BaseApp, { BaseAppRoute } from "../layouts/base_app";

const stories = storiesOf('App Layout', module);

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

    protected _getLoginComponent(): JSX.Element {
        return <div>Sign In</div>
    }

    protected _getRoutes(): BaseAppRoute[] {
        return []
    }
}

stories.addDecorator(withKnobs);

stories.add('Base app', withInfo(
    'A example layout for an application'
)(() =>
    <StoriesApp />
));
