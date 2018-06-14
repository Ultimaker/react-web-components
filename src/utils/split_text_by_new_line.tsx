import * as React from 'react';

function splitTextByNewLine(text: string): JSX.Element[] {
  if (text) {
    return text.split("\n").map((p, i) => <p key={i}>{p}</p>);
  }
  return null;
}

export default splitTextByNewLine;