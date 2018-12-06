import * as React from 'react';

/**
 * Spilt text into separate paragraphs (<p>) wherever '\n' is found
 * @param text - The text to be split
 */
function splitTextByNewLine(text: string): JSX.Element[] {
    if (text) {
        return text.split('\n').map((p, i) => <p key={i}>{p}</p>);
    }
    return null;
}

export default splitTextByNewLine;
