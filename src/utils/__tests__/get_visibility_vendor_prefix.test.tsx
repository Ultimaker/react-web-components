// Copyright (c) 2018 Ultimaker B.V.

// util
import getVisibilityVendorPrefix from '../get_visibility_vendor_prefix';

test('Visibility vendor prefix is not needed', () => {
    expect(getVisibilityVendorPrefix()).toEqual('');
})
