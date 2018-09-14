// Copyright (c) 2018 Ultimaker B.V.

// util
import { I18n } from '../i18n';


test('I18n is initialized', () => {
    I18n.initialize([
        { 'name': 'en-US', 'source': '' }
    ])

    expect(I18n.getLocale()).toBe('en-US');
})

test('Is language supported', () => {
    expect(I18n.isLanguageSupported('en-US')).toBe(true);
})

test('Is text translated', () => {
    expect(I18n.translate('Test string', 'Test string')).toBe('Test string');
})

test('Is text formated and translated', () => {
    expect(I18n.format('Test string', 'Test string with inserted %{value}', { value: 'string' })).toBe('Test string with inserted string');
})

test('Is text translated with plurals', () => {
    expect(I18n.plural('Test string', 'Test string', 'Test strings', 1)).toBe('Test string');
    expect(I18n.plural('Test string', 'Test string', 'Test strings', 2)).toBe('Test strings');
})
