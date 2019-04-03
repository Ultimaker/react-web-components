// Copyright (c) 2018 Ultimaker B.V.

// util
import { objectEquals } from '../json_matching';

test('objectEquals', () => {
    // empty objects
    // match true
    expect(objectEquals({}, {})).toBe(true);
    // match false
    expect(objectEquals({}, { a: 1 })).toBe(false);

    // simple objects
    // match true
    expect(objectEquals(
        { a: 1, b: 2, c: 3 },
        { b: 2, a: 1, c: 3 },
    )).toBe(true);
    // match false
    expect(objectEquals(
        { a: 1, b: 2, c: 3 },
        { b: 1, a: 1, c: 3 },
    )).toBe(false);

    // nested array
    // match true
    expect(objectEquals(
        { a: [1, 2, 3], b: 2, c: 3 },
        { b: 2, a: [1, 2, 3], c: 3 },
    )).toBe(true);
    // match false
    expect(objectEquals(
        { a: [1, 2, 3], b: 2, c: 3 },
        { b: 2, a: [1, 1, 3], c: 3 },
    )).toBe(false);

    // nested object
    // match true
    expect(objectEquals(
        { a: { x: 1, y: 2, z: 3 }, b: 2, c: 3 },
        { b: 2, a: { x: 1, z: 3, y: 2 }, c: 3 },
    )).toBe(true);
    // match false
    expect(objectEquals(
        { a: { x: 1, y: 2, z: 3 }, b: 2, c: 3 },
        { b: 2, a: { x: 1, z: 1, y: 2 }, c: 3 },
    )).toBe(false);
});
