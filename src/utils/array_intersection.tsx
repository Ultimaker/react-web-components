// returns an array containing the common elements of two given arrays
export function arrayIntersection(firstArray: any[], secondArray: any[]): any[] {
    if (Array.isArray(firstArray) && Array.isArray(secondArray)) {
        return firstArray.filter((firstArrayElement) => (
            secondArray.includes(firstArrayElement)));
    }
    return [];
}

export default arrayIntersection;
