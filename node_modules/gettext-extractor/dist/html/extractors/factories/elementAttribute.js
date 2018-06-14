"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const element_1 = require("./element");
const validate_1 = require("../../../utils/validate");
const common_1 = require("../common");
function elementAttributeExtractor(selector, textAttribute, options = {}) {
    validate_1.Validate.required.nonEmptyString({ selector, textAttribute });
    common_1.validateOptions(options);
    return element_1.elementExtractor(selector, element => {
        return utils_1.HtmlUtils.getAttributeValue(element, textAttribute);
    }, options);
}
exports.elementAttributeExtractor = elementAttributeExtractor;
