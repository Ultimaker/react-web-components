// Copyright (c) 2018 Ultimaker B.V.

// util
import isBrowserWindowHidden from '../is_browser_window_hidden';

test('Browser window is visible', () => {
    expect(isBrowserWindowHidden()).toBe(false);
});
