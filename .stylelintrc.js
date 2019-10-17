module.exports = {
    extends: '@ultimaker/stylelint-config/scss',
    rules: {
        // To be removed once @extends are gone
        'at-rule-blacklist': null,
        // To be removed once line-heights are unitless
        'declaration-property-unit-blacklist': null,
        // Only here to supress nesting-depth warnings
        'max-nesting-depth': null,
        // see: https://stylelint.io/user-guide/rules/no-descending-specificity
        'no-descending-specificity': null,
        // These can be removed once AutoPrefixer in used in consuming projects
        'property-no-vendor-prefix': null,
        'value-no-vendor-prefix': null,
    },
};

