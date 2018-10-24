// Copyright (c) 2018 Ultimaker B.V.

/**
 * Copies a string to the user's clipboard.
 * @param value - The string to be copied.
 */
export function copyToClipboard(value: string){
    let selectionTextarea = document.createElement('textarea');
    selectionTextarea.style.position = 'fixed';
    selectionTextarea.style.left = '0';
    selectionTextarea.style.top = '0';
    selectionTextarea.style.opacity = '0';
    selectionTextarea.value = value;
    document.body.appendChild(selectionTextarea);
    selectionTextarea.focus();
    selectionTextarea.select();
    document.execCommand('copy');
    document.body.removeChild(selectionTextarea);
}
  
export default copyToClipboard;
