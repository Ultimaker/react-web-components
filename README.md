# React Web Components

[![Greenkeeper badge](https://badges.greenkeeper.io/Ultimaker/react-web-components.svg)](https://greenkeeper.io/)

This library contains all shared components, utilities and templates for front-end applications within Ultimaker R&D.

## Installation
Make sure you have the following dependencies installed on your machine:

* node.js 8.x
* yarn

Then clone this repository.

## Run storybook
```bash
yarn install
yarn start
```

## Build storybook
Normally done automatically during CI.

```bash
yarn install
yarn build
```

You can now serve the static content in the `/public` folder.

## Release to npm

```bash
yarn publish
```
A new version number should be given the follows [semver](https://semver.org/).
You should also make a release on github to document the changes.
