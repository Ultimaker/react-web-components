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
function keydownOverride(e: any): void {
    scrollKeys.forEach((code) => {
        if (e.keyCode === code) {
            preventDefault(e);
        }
    });
}

/**
 * This is a replacement to the build-in 'mousewheel' and 'scroll' handlers in the browser.
 * @param e - Event object.
 */
function wheelOverride(e: any): void {
    preventDefault(e);
}

/**
 * Enable scrolling in the DOM.
 */
export function enableScrolling(): void {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheelOverride, false); // desktop
    }
    window.onmousewheel = null;
    document.onscroll = null;
    document.onkeydown = null;
    document.removeEventListener('touchmove', preventDefault, false); // mobile
}

/**
 * Disable scrolling in the DOM.
 */
export function disableScrolling(): void {
    if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', wheelOverride, false); // desktop
    }
    window.onmousewheel = wheelOverride;
    document.onscroll = wheelOverride;
    document.onkeydown = keydownOverride;
    document.addEventListener('touchmove', preventDefault, false); // mobile
}

export default { enable_scrolling, disable_scrolling };
