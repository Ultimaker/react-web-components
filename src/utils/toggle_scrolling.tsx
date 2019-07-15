// Adapted from from https://stackoverflow.com/a/4770179

// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
// left: 37, up: 38, right: 39, down: 40,
const scrollKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40];

/**
 * Robust way to really block default behavior.
 * @param e - Event object.
 */
function preventDefault(e: any = window.event): void {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.returnValue = false;
}

/**
 * This is a replacement to the build-in 'keydown' handler in the browser.
 * @param e - Event object.
 */
export function keydownOverride(e: any): void {
    scrollKeys.forEach((code) => {
        if (e.keyCode === code) {
            preventDefault(e);
        }
    });
}

/**
 * Enable scrolling in the DOM.
 */
export function enableScrolling(): void {
    window.removeEventListener('DOMMouseScroll', preventDefault, false); // desktop
    document.removeEventListener('touchmove', preventDefault, true); // mobile
    document.removeEventListener('keydown', keydownOverride, true);
    window.onmousewheel = null;
    document.onscroll = null;
}

/**
 * Disable scrolling in the DOM.
 */
export function disableScrolling(): void {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // desktop
    document.addEventListener('touchmove', preventDefault, true); // mobile
    document.addEventListener('keydown', keydownOverride, true);
    window.onmousewheel = preventDefault;
    document.onscroll = preventDefault;
}

export default { enableScrolling, disableScrolling };
