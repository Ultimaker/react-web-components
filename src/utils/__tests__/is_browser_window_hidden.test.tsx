// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';

// util
import isBrowserWindowHidden from '../is_browser_window_hidden';

test('Browser window is hidden', () => {
    expect(isBrowserWindowHidden()).toEqual(true);
})
