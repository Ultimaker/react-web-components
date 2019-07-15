// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow, mount } from 'enzyme';

// utils
import { enableScrolling, disableScrolling } from '../../utils/toggle_scrolling'

describe('disableScrolling', () => {
    let mouseScrollEvent;
    let scrollKeyEvent;
    let otherKeyEvent;

    beforeEach(() => {
        mouseScrollEvent = new Event('DOMMouseScroll');
        mouseScrollEvent.stopPropagation = jest.fn();
        mouseScrollEvent.preventDefault = jest.fn();

        scrollKeyEvent = new KeyboardEvent('keydown', {'code': 'ArrowDown'});
        scrollKeyEvent.preventDefault = jest.fn();
    
        otherKeyEvent = new KeyboardEvent('keydown', {'code': 'KeyA'});
        otherKeyEvent.preventDefault = jest.fn();
        
        disableScrolling();
    });

    it('should prevent mouse wheel behavior', () => {
        window.dispatchEvent(mouseScrollEvent);
        expect(mouseScrollEvent.preventDefault).toBeCalled();
    });

    it('should prevent keyboard scroll behavior', () => {
        document.dispatchEvent(scrollKeyEvent);
        expect(scrollKeyEvent.preventDefault).toBeCalled();
    });

    it('should not prevent other keyboard key presses', () => {
        document.dispatchEvent(otherKeyEvent);
        expect(otherKeyEvent.preventDefault).not.toBeCalled();
    });
});

describe('enableScrolling', () => {
    let mouseScrollEvent;
    let scrollKeyEvent;
    let otherKeyEvent;

    beforeEach(() => {
        mouseScrollEvent = new Event('DOMMouseScroll');
        mouseScrollEvent.stopPropagation = jest.fn();
        mouseScrollEvent.preventDefault = jest.fn();

        scrollKeyEvent = new KeyboardEvent('keydown', {'code': 'ArrowDown'});
        scrollKeyEvent.preventDefault = jest.fn();
        
        otherKeyEvent = new KeyboardEvent('keydown', {'code': 'KeyA'});
        otherKeyEvent.preventDefault = jest.fn();
        
        enableScrolling();
    });

    it('should allow mouse wheel behavior', () => {
        window.dispatchEvent(mouseScrollEvent);
        expect(mouseScrollEvent.preventDefault).not.toBeCalled();
    });

    it('should allow keyboard scroll behavior', () => {    
        document.dispatchEvent(scrollKeyEvent);
        expect(scrollKeyEvent.preventDefault).not.toBeCalled();   
    });

    it('should not prevent other keyboard key presses', () => {
        document.dispatchEvent(otherKeyEvent);
        expect(otherKeyEvent.preventDefault).not.toBeCalled();
    });
});





