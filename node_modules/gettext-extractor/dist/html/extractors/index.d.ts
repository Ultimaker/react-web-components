import { elementContentExtractor } from './factories/elementContent';
import { elementAttributeExtractor } from './factories/elementAttribute';
import { embeddedJsExtractor } from './factories/embeddedJs';
export declare abstract class HtmlExtractors {
    static elementContent: typeof elementContentExtractor;
    static elementAttribute: typeof elementAttributeExtractor;
    static embeddedJs: typeof embeddedJsExtractor;
}
