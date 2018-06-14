"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elementContent_1 = require("./factories/elementContent");
const elementAttribute_1 = require("./factories/elementAttribute");
const embeddedJs_1 = require("./factories/embeddedJs");
class HtmlExtractors {
}
HtmlExtractors.elementContent = elementContent_1.elementContentExtractor;
HtmlExtractors.elementAttribute = elementAttribute_1.elementAttributeExtractor;
HtmlExtractors.embeddedJs = embeddedJs_1.embeddedJsExtractor;
exports.HtmlExtractors = HtmlExtractors;
