/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */
import { configure } from '@storybook/react';

// load assets
import "../src/stylesheets/fonts.scss";
import "../src/stylesheets/main.scss";
import "../src/fonts/NotoSans-Regular.woff";
import "../src/fonts/NotoSans-Medium.woff";
import "../src/fonts/NotoSans-Regular.woff2";
import "../src/fonts/NotoSans-Medium.woff2";

// load stories
const req = require.context('../src', true, /\.stories.tsx?$/)
function loadStories() {
    req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
