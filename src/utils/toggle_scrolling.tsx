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
    'ArrowDown', // down
];

/**
 * Robust way to really block default behavior.
 * @param e - Event object.
 */
export function preventDefault(e: Event): void {
    console.log("SCROLL", e.target)
    e.preventDefault();
    e.returnValue = false;
}

/**
 * This is a replacement to the build-in 'keydown' handler in the browser.
 * @param e - Event object.
 */
export function keydownOverride(e: KeyboardEvent): void {
    scrollKeys.forEach((code) => {
        const target = e.target as HTMLElement;

        // Only block keys which are listed above and when there isn't a more specific target
        if (e.code === code && target.tagName.toUpperCase() === 'BODY') {
            preventDefault(e);
        }
    });
}

/**
 * Enable scrolling in the DOM.
 */
export function enableScrolling(): void {
    console.log("SCROLLING ENABLED")
    window.removeEventListener('DOMMouseScroll', preventDefault, true); // desktop
    document.body.removeEventListener('touchmove', preventDefault, true); // mobile
    document.body.removeEventListener('keydown', keydownOverride, true);
    window.onmousewheel = null;
    document.onscroll = null;
}

/**
 * Disable scrolling in the DOM.
 */
export function disableScrolling(): void {
    console.log("SCROLLING DISABLED")
    window.addEventListener('DOMMouseScroll', preventDefault, true); // desktop
    document.body.addEventListener('touchmove', preventDefault, true); // mobile
    document.body.addEventListener('keydown', keydownOverride, true);
    window.onmousewheel = preventDefault;
    document.onscroll = preventDefault;
}

export default { enableScrolling, disableScrolling };
