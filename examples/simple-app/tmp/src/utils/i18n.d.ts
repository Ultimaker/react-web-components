import 'moment/locale/de';
import 'moment/locale/es';
import 'moment/locale/fr';
import 'moment/locale/it';
import 'moment/locale/nl';
import 'moment/locale/pl';
import 'moment/locale/tr';
import 'moment/locale/zh-cn';
import 'moment/locale/ja';
import 'moment/locale/ko';
import 'moment/locale/pt';
import 'moment/locale/ru';
export declare function i18nc_format(context: string, msg: string, parameters: object): string;
export declare function i18nc_plural(context: string, msg: string, msgPlural: string, numberOfThings: number): string;
export declare function i18nc(context: string, msg: string): string;
export declare var I18n: {
    load({ path, locale, complete }: {
        path: any;
        locale: any;
        complete: any;
    }): void;
    setMomentLocale(locale: string): void;
    getLocale(): string;
};
