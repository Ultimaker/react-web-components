// Copyright (c) 2018 Ultimaker B.V.

/**
 * Class that can be used in tests to check whether an object matches the given JSON.
 * Usage: `expect(fetch).toHaveBeenLastCalledWith(url, {method: 'post', body: new JsonMatching({data: {...}})})`
 */
class JsonMatching {
    expected: any
    inverse: boolean

    constructor(expected: any, inverse: boolean = false) {
        this.expected = JSON.parse(JSON.stringify(expected))
        this.inverse = inverse
    }

    asymmetricMatch(other: string): boolean {
        const actual = JSON.parse(other)
        const result = objectEquals(this.expected, actual)
        return this.inverse ? !result : result
    }

    toString() {
        return `Json${this.inverse ? 'Not' : ''}Matching`
    }
}

// objectEquals from https://stackoverflow.com/a/6713782
export function objectEquals(x, y) {
    // if both x and y are null or undefined and exactly the same
    if (x === y) {
        return true
    }

    // if they are not strictly equal, they both need to be Objects
    if (!(x instanceof Object) || !(y instanceof Object)) {
        return false
    }

    // they must have the exact same prototype chain, the closest we can do is test their constructors.
    if (x.constructor !== y.constructor) {
        console.warn("Mismatch in constructor")
        return false
    }

    for (let p in x) {
        // other properties were tested using x.constructor === y.constructor
        if (!x.hasOwnProperty(p)) {
            continue
        }

        // allows to compare x[ p ] and y[ p ] when set to undefined
        if (!y.hasOwnProperty(p)) {
            console.warn("Mismatch in property " + p)
            return false
        }

        // if they have the same strict value or identity then they are equal
        if (x[p] === y[p]) {
            continue
        }

        // Numbers, Strings, Functions, Booleans must be strictly equal
        if (typeof(x[p]) !== "object") {
            console.warn("Mismatch in property " + p)
            return false
        }

        // Objects and Arrays must be tested recursively
        if (!objectEquals(x[p], y[p])) {
            console.warn("Mismatch in property " + p)
            return false
        }
    }

    for (let p in y) {
        // allows x[ p ] to be set to undefined
        if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
            console.warn("Mismatch in property " + p)
            return false
        }
    }
    return true
}


export default JsonMatching
