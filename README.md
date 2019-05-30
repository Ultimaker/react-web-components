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
To make a new release, just create an annotated git tag with the new version number. The CI will pick this up and publish it to npm. The new version number must follow [semver](https://semver.org/).
You should also make a release on github to document the changes.

example:
```bash
git tag -a v5.1.2 -m "Tagging 5.1.2 release"
git push --tags
```
