import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';

import BaseApp, { BaseAppRoute } from '../layouts/base_app';

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

  protected _getLoginComponent(): JSX.Element {
    return <div>Sign In</div>
  }

  protected _getRoutes(): BaseAppRoute[] {
    return []
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
