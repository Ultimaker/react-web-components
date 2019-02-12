// Copyright (c) 2018 Ultimaker B.V.

// util
import range from '../range';

test('Range is created', () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
});
