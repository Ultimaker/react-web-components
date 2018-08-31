/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */
import { configure } from '@storybook/react';

// load assets
import "../src/sass/fonts.sass";
import "../src/sass/main.sass";
import "../src/fonts/notosans/NotoSans-Regular.woff";
import "../src/fonts/notosans/NotoSans-Bold.woff";
import "../src/fonts/notosans/NotoSans-Medium.woff";
import "../src/fonts/notosans/NotoSans-Regular.woff2";
import "../src/fonts/notosans/NotoSans-Bold.woff2";
import "../src/fonts/notosans/NotoSans-Medium.woff2";

// load stories
const req = require.context('../src', true, /\.stories.tsx?$/)
function loadStories() {
    req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
