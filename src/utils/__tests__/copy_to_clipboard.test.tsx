// Copyright (c) 2018 Ultimaker B.V.
import copyToClipboard from '../copy_to_clipboard';

test('Copy to clipboard', () => {
    // prepare mock
    const elementMock: any = { focus: jest.fn(), select: jest.fn(), style: {} };
    const createElementSpy = jest.spyOn(document, 'createElement').mockReturnValue(elementMock);
    const appendChildSpy = jest.spyOn(document.body, 'appendChild').mockImplementation();
    const removeChildSpy = jest.spyOn(document.body, 'removeChild').mockImplementation();
    const execCommandMock = jest.fn();
    document.execCommand = execCommandMock;

    // click copy button
    copyToClipboard('the string that should be copied');

    // copy must have been executed
    expect(createElementSpy).toHaveBeenCalledWith('textarea');
    expect(elementMock).toEqual({
        style: {
            left: '0', opacity: '0', position: 'fixed', top: '0',
        },
        focus: expect.any(Function),
        select: expect.any(Function),
        value: 'the string that should be copied',
    });
    expect(elementMock.focus).toHaveBeenCalledWith();
    expect(elementMock.select).toHaveBeenCalledWith();
    expect(appendChildSpy).toHaveBeenCalledWith(elementMock);
    expect(removeChildSpy).toHaveBeenCalledWith(elementMock);
    expect(execCommandMock).toHaveBeenCalledWith('copy');
});
