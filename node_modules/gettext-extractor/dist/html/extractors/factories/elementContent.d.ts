import { IHtmlExtractorFunction } from '../../parser';
import { IContentExtractorOptions } from '../../../utils/content';
import { IHtmlExtractorOptions } from '../common';
export interface IElementContentExtractorOptions extends IHtmlExtractorOptions, IContentExtractorOptions {
}
export declare function elementContentExtractor(selector: string, options?: IElementContentExtractorOptions): IHtmlExtractorFunction;
