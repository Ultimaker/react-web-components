import Gettext = require('node-gettext');
import { po } from 'gettext-parser';
import * as moment from 'moment';
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

let localeName;
const supportedLanguages = ['de', 'en', 'es', 'fr', 'it', 'nl', 'pl', 'tr', 'zh', 'ja', 'ko', 'pt', 'ru'];
const defaultLanguage = 'en';

moment.locale(defaultLanguage);

const gt = new Gettext({debug: false});

function isLanguageSupported(browserLanguage: string): boolean {
  return supportedLanguages.indexOf(browserLanguage) !== -1;
}

function interpolate(string, parameters = {}) {
  for (const name in parameters) {
    string = string.replace(`%{${name}}`, parameters[name]);
  }
  return string;
}

export function i18nc_format(context: string, msg: string, parameters: object): string {
  const stringValue = gt.pgettext(context, msg);
  return interpolate(stringValue, parameters);
}

export function i18nc_plural(context: string, msg: string, msgPlural: string, numberOfThings: number): string {
  const stringValue = gt.dngettext(context, msg, msgPlural, numberOfThings);
  return interpolate(stringValue, {n: numberOfThings});
}

export function i18nc(context: string, msg: string): string {
  return gt.pgettext(context, msg);
}

export var I18n = {
  load({ path, locale, complete }): void {
    localeName = locale;
    const forceReloadToken = '?' + (new Date()).getTime();

    const request = new XMLHttpRequest();

    request.addEventListener('load', () => {
      const parsedTranslations = po.parse(request.responseText);
      gt.addTranslations(locale, "messages", parsedTranslations);
      complete();
    });

    request.open('GET', `${path}/${locale}.po${forceReloadToken}`);
    request.send();
  },

  setMomentLocale(locale: string): void {
    let momentLocale;

    if (locale === 'zh') {
      momentLocale = 'zh-cn';
    } else {
      momentLocale = locale;
    }

    moment.locale(momentLocale);
  },

  getLocale(): string {
    let language = defaultLanguage;

    if (navigator.languages !== undefined) {
      for (let i = 0; i < navigator.languages.length; i++) {
        const browserLanguage = navigator.languages[i].slice(0, 2);
        if (isLanguageSupported(browserLanguage)) {
          language = browserLanguage;
          break;
        }
      }
    } else {
      const browserLanguage = navigator.language ? navigator.language.slice(0, 2) : window.navigator['browserLanguage'].slice(0, 2);
      if (isLanguageSupported(browserLanguage)) {
        language = browserLanguage;
      }
    }
    return language;
  }
}

gt.setLocale(I18n.getLocale());
