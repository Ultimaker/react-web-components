import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { SearchBar } from '..';

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
