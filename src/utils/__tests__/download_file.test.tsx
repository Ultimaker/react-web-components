// Copyright (c) 2018 Ultimaker B.V.

import downloadFile from '../download_file';

test('Downloading a file', () => {
    // prepare mock
    const elementMock = { click: jest.fn() };
    const createElementSpy = jest.spyOn(document, 'createElement').mockReturnValue(elementMock);
    const createObjectURL = jest.fn().mockReturnValue('obj://test-url');
    // @ts-ignore
    global.URL.createObjectURL = createObjectURL;

    // click download button
    downloadFile('file-name.txt', 'file contents');

    // download must have been done
    expect(createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(elementMock).toEqual({
        click: expect.any(Function),
        download: 'file-name.txt',
        href: 'obj://test-url',
    });
    expect(elementMock.click).toHaveBeenCalledTimes(1);
});
