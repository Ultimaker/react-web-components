module.exports = {
    extends: '@ultimaker/eslint-config',
    overrides: [{
        files: './src/jestsetup.tsx',
        rules: {
            // keep enzyme a devDependency
            'import/no-extraneous-dependencies': [
                'error',
                {
                    'devDependencies': true,
                },
            ],
        },
    }],
    root: true,
};
