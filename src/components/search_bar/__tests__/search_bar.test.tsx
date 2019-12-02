import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { SearchBar } from '..';

jest.mock('uuid/v4', () => jest.fn().mockReturnValue('d2e08c2a-365b-40a5-9f2d-64c28610b113'));

// Use real timers for this one because https://github.com/facebook/jest/issues/3465

describe('search_bar.tsx', () => {
    let wrapper: ReactWrapper;
    let emitDelay: number;
    const query = 'hello world';
    const placeholder = 'For example…';
    const onChange: jest.Mock<any, any> = jest.fn();

    afterEach(() => {
        onChange.mockReset();
        wrapper.unmount();
    });

    test('snapshot and instance', () => {
        wrapper = mount(<SearchBar onChange={onChange} placeholder={placeholder} />);
        expect(wrapper.instance()).toBeInstanceOf(SearchBar);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('label').prop('htmlFor')).toBe('d2e08c2a-365b-40a5-9f2d-64c28610b113');
        expect(wrapper.find('input').prop('id')).toBe('d2e08c2a-365b-40a5-9f2d-64c28610b113');
    });

    test('with "query" prop', (done) => {
        wrapper = mount(
            <SearchBar
                onChange={onChange}
                placeholder={placeholder}
                query={query}
            />,
        );
        expect(onChange).not.toHaveBeenCalled();
        setTimeout(() => {
            expect(onChange).toHaveBeenCalledTimes(1);
            expect(onChange).toHaveBeenCalledWith(query);
            done();
        }, 0);
    });

    test('with "emitDelay" prop', (done) => {
        emitDelay = 500;
        wrapper = mount(
            <SearchBar
                onChange={onChange}
                placeholder={placeholder}
                emitDelay={emitDelay}
                query={query}
            />,
        );
        expect(onChange).not.toHaveBeenCalled();
        setTimeout(() => {
            expect(onChange).toHaveBeenCalledTimes(1);
            expect(onChange).toHaveBeenCalledWith(query);
            done();
        }, emitDelay);
    });
});
