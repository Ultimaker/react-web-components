import getVisibilityVendorPrefix from './get_visibility_vendor_prefix';

function isBrowserWindowHidden(): boolean {
  if (getVisibilityVendorPrefix() === null) {
    return false;
  }
  else if (getVisibilityVendorPrefix().length === 0) {
    return document['hidden'];
  }
  else {
    return document[getVisibilityVendorPrefix() + 'Hidden'];
  }
}

export default isBrowserWindowHidden;