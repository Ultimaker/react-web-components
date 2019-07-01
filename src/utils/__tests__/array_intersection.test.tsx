// Copyright (c) 2019 Ultimaker B.V.
import arrayIntersection from '../array_intersection';

describe('The arrayIntersection function', () => {
    const array1 = [
        1,
        2,
        'cat',
        'dog',
        5,
    ];
    const array2 = [
        'bird',
        2,
        'cat',
        'fish',
        55,
    ];
    const expectedIntersection = [
        2,
        'cat',
    ];

    it('should return the given error code if its not recognized as related to the air manager', () => {
        expect(arrayIntersection(array1, array2)).toEqual(expectedIntersection);
    });

    it('should return an empty array if one of the arguments is null', () => {
        expect(arrayIntersection(array1, null)).toEqual([]);
    });
});
