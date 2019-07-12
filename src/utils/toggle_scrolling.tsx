// Adapted from from https://stackoverflow.com/a/4770179

// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
// left: 37, up: 38, right: 39, down: 40,
const scroll_keys = [32,33,34,35,36,37,38,39,40];

/**
 * Robust way to really block default behavior.
 * @param e - Event object.
 */
function preventDefault(e: any): void {
    e = e || window.event;
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
    for (var i = scroll_keys.length; i--;) {
        if (e.keyCode === scroll_keys[i]) {
            preventDefault(e);
            return;
        }
    }
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
export function enable_scrolling(): void {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheelOverride, false);
    }
    window.onmousewheel = document.onscroll = document.onkeydown = null;  
    document.removeEventListener('touchmove', preventDefault, false);
}

/**
 * Disable scrolling in the DOM.
 */
export function disable_scrolling(): void {
    if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', wheelOverride, false);
    }
    window.onmousewheel = document.onscroll = wheelOverride;
    document.onkeydown = keydownOverride;
    document.addEventListener('touchmove', preventDefault, false);
}

export default { enable_scrolling, disable_scrolling };
