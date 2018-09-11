// Copyright (c) 2018 Ultimaker B.V.

// util
import { I18n } from '../i18n';


test('I18n is initialized', () => {
    I18n.initialize([
        { 'name': 'en-US', 'source': '' }
    ])

    expect(I18n.getLocale()).toEqual('en-US');
})

test('Is language supported', () => {
    expect(I18n.isLanguageSupported('en-US')).toEqual(true);
})

test('Is text translated', () => {
    expect(I18n.translate('Test string', 'Test string')).toEqual('Test string');
})

test('Is text formated and translated', () => {
    expect(I18n.format('Test string', 'Test string with inserted %{value}', { value: 'string' })).toEqual('Test string with inserted string');
})

test('Is text translated with plurals', () => {
    expect(I18n.plural('Test string', 'Test string', 'Test strings', 1)).toEqual('Test string');
    expect(I18n.plural('Test string', 'Test string', 'Test strings', 2)).toEqual('Test strings');
})
