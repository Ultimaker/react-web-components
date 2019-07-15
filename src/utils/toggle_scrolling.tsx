// Adapted from from https://stackoverflow.com/a/4770179

const scrollKeys = [
    'Space', // space
    'PageDown', // page up
    'PageDown', // page down
    'End', // end
    'Home', // home
    'ArrowLeft', // left
    'ArrowUp', // up
    'ArrowRight', // right
    'ArrowDown' // down
];

/**
 * Robust way to really block default behavior.
 * @param e - Event object.
 */
export function preventDefault(e: Event): void {
    e.preventDefault();
    e.returnValue = false;
}

/**
 * This is a replacement to the build-in 'keydown' handler in the browser.
 * @param e - Event object.
 */
export function keydownOverride(e: KeyboardEvent): void {
    scrollKeys.forEach((code) => {
        if (e.code == code) {
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
