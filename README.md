# React Web Components

[![Greenkeeper badge](https://badges.greenkeeper.io/Ultimaker/react-web-components.svg)](https://greenkeeper.io/)

This library contains all shared components, utilities and templates for front-end applications within Ultimaker R&D.

## Installation
Make sure you have the following dependencies installed on your machine:

* node.js 8.x
* npm

Then clone this repository.

## Run storybook
```bash
npm install
npm run start
```

## Build storybook
Normally done automatically during CI.

```bash
npm install
npm run build
```

You can now serve the static content in the `/public` folder.

## Release to npm
To make a new release, run `npm version` with the right parameters (see example). This will update the package.json file, commit the changes and create an annotated tag. After pushing, the CI will pick this up and publish it to npm. 
You should also make a release on github to document the changes.

See https://docs.npmjs.com/cli/version for supported parameters to `npm version`. 

example (%s here will be automatically replaced with the new version number):
```bash
npm version patch -m "Upgrade to %s for reasons"
git push --follow-tags
```
