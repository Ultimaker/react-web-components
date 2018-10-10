/* http://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript */

import {I18n} from './i18n'

const sizes = [
  I18n.translate('bytes to size', 'Bytes'),
  I18n.translate('bytes to size', 'KB'),
  I18n.translate('bytes to size', 'MB'),
  I18n.translate('bytes to size', 'GB'),
  I18n.translate('bytes to size', 'TB'),
];

function bytesToSize(bytes: number): string {
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (Math.round(100 * bytes / Math.pow(1024, i)) / 100).toString() + sizes[i];
}

export default bytesToSize;
