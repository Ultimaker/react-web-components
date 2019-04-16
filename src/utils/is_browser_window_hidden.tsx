import getVisibilityVendorPrefix from './get_visibility_vendor_prefix';

/**
 * Detect whether the browser window is hidden,
 * i.e. the tab is not active or the window is not open
 */
export function isBrowserWindowHidden(): boolean {
    if (getVisibilityVendorPrefix() === null) {
        return false;
    }
    if (getVisibilityVendorPrefix().length === 0) {
        return document.hidden;
    }

    return document[`${getVisibilityVendorPrefix()}Hidden`];
}

export default isBrowserWindowHidden;
