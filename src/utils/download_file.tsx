// Copyright (c) 2018 Ultimaker B.V.

/**
 * Allows the user to download a file with the given contents.
 * @param fileName - The default name of the file.
 * @param fileContent - The content of the file.
 * @param contentType - The content type, including the charset.
 * Defaults to "text/plain;charset=utf-8".
 */
function downloadFile(fileName: string, fileContent: string, contentType?: string) {
    const blob = new Blob([fileContent], { type: contentType || 'text/plain;charset=utf-8' });
    const element = document.createElement('a');
    element.href = URL.createObjectURL(blob);
    element.download = fileName;
    element.click();
}

export default downloadFile;
