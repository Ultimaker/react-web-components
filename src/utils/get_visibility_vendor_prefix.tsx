/**
 * Gets browser prefix needed to support Document.hidden
 */
export function getVisibilityVendorPrefix(): string {
    const prefixes = ['webkit', 'moz', 'ms', 'o'];

    // if 'hidden' is natively supported return nothing
    if ('hidden' in document) return '';

    // otherwise loop over all the known prefixes until we find one
    for (let i = 0; i < prefixes.length; i += 1) {
        if ((`${prefixes[i]}Hidden`) in document) { return prefixes[i]; }
    }

    // otherwise it's not supported
    return null;
}

export default getVisibilityVendorPrefix;
