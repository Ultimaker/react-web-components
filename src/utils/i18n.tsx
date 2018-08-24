// Copyright (c) 2018 Ultimaker B.V.
import Gettext = require('node-gettext');
import { po } from 'gettext-parser'
import * as React from 'react'

// type for available languages
export type Languages = 'en-US' | 'nl-NL'

// interface for translation items that are passed into initialize
export interface TranslationListItem {
	name: Languages
	source: any
}

/**
 * Assorted methods for translations.
 */
export class I18n {

	private static _gt = new Gettext({ debug: false })
	private static _defaultLanguage = 'en-DEV'
	private static _supportedLanguages: Languages[] = ['en-US', 'nl-NL']

	/**
	 * Initialize the Gettext context.
	 */
	public static async initialize(translations: TranslationListItem[]) {

		// load the translation files
		translations.forEach(async translation => await this._loadTranslation(translation.name, translation.source))

		// set the default locale based on the browser settings
		I18n._gt.setLocale(I18n.getLocale())
	}

	/**
	 * Get the locale determined by the browser.
	 */
	public static getLocale(): string {

		// determine the first supported language using navigator.languages
		if (navigator.languages !== undefined) {
			return navigator.languages.find(I18n.isLanguageSupported)
		}

		// determine the language using navigator.language (fallback 1)
		if (navigator.language !== undefined) {
			return [navigator.language].find(I18n.isLanguageSupported)
		}

		// determine the language using navigator.browserLanguage (fallback 2)
		if (navigator.hasOwnProperty('browserLanguage')) {
			return [navigator['browserLanguage']].find(I18n.isLanguageSupported)
		}

		// return the default language
		return I18n._defaultLanguage
	}

	/**
	 * Check if the given language is supported.
	 * @param language The language to check, for example 'en'.
	 */
	public static isLanguageSupported(language: Languages): boolean {
		return I18n._supportedLanguages.indexOf(language) > -1
	}

	/**
	 * Get a translated version of the given text.
	 * @param context Context markers for this text to help translators.
	 * @param text The text to translate or fallback to.
	 */
	public static translate(context: string, text: string): string {
		return I18n._gt.pgettext(context, text)
	}

	/**
	 * Get a translated and formatted version of the given text.
	 * @param context Context markers for this text to help translators.
	 * @param text The text to translate and format.
	 * @param parameters The parameters to insert in the text.
	 */
	public static format(context: string, text: string, parameters: object): string {
		return I18n.interpolate(this.translate(context, text), parameters)
	}

	/**
	 * Get a translated and plural version of the given text.
	 * @param context Context markers for this text to help translators.
	 * @param text The text containing the singular version to translate and format.
	 * @param textPlural The text containing the plural version to translate and format.
	 * @param numberOfThings The count of things described by the text/textPlural. Inserted into the text using `n`.
	 */
	public static plural(context: string, text: string, textPlural: string, numberOfThings: number): string {
		const stringValue = I18n._gt.dngettext(context, text, textPlural, numberOfThings)
		return I18n.interpolate(stringValue, { n: numberOfThings });
	}

	/**
	 * Replace all passed parameters in a text.
	 * @param text The text to interpolate.
	 * @param parameters The parameters to insert in the text.
	 */
	public static interpolate(text: string, parameters: object = {}): string {
		return text.replace(/%{(\w+)}/g, (_, expr) => (parameters || window)[expr])
	}

	/**
	 * Get a translated and formatted version of the given text, allowing elements as text parameters.
	 * @param context Context markers for this text to help translators.
	 * @param text The text to translate and format.
	 * @param parameters The parameters to insert in the text.
	 * @return A list of elements.
	 */
	public static formatElements(context: string, text: string,
		parameters: { [key: string]: string | JSX.Element }): JSX.Element[] {
		return I18n.interpolateElements(this.translate(context, text), parameters)
	}

	/**
	 * Replace all passed parameters in a text.
	 * @param text The text to interpolate.
	 * @param parameters The parameters to insert in the text.
	 * @return A list of elements enclosed in spans.
	 */
	public static interpolateElements(text: string, parameters: { [key: string]: string | JSX.Element }): JSX.Element[] {
		return text.split(/%{(\w+)}/g).map((part, i) => part &&
			<span key={i}>{parameters[part] || part}</span>
		)
	}

	/**
	 * Loads a language source file async.
	 * @param language - The language we're loading.
	 * @param url - The url of the language source file.
	 */
	private static async _loadTranslation(language: Languages, url: string): Promise<void> {
		await fetch(url)
			.then(response => response.text())
			.then(text => I18n._parse(text))
			.then(translations => I18n._gt.addTranslations(language, 'messages', translations))
	}

	/**
	 * Parse a translations source file into an object that gettext can read.
	 * @param source Translations source file.
	 */
	private static _parse(source: string): any {
		return po.parse(source)
	}
}
