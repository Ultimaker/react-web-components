/**
 * Creates an array of numbers (positive and/or negative) progressing from start up to,
 * but not including, end.
 * @param start - start of the range.
 * @param end - end of the range.
 */
function range(start: number, end: number): number[] {
    const length = end - start;
    return Array.from({ length }, (e, i) => start + i);
}

export default range;
