// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import LoadingPage from '../loading_page';
import Spinner from '../spinner';

describe('The LoadingPage component', () => {
    let wrapper;

    beforeEach(() => {
        jest.useFakeTimers();
        wrapper = shallow(<LoadingPage />);
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should spinner after timeout', () => {
        expect(wrapper.find(Spinner)).toHaveLength(0);
        jest.runOnlyPendingTimers();
        expect(wrapper.find(Spinner)).toHaveLength(1);
    });

    it('should cancel timeout on unmount', () => {
        wrapper.unmount();
        expect(clearTimeout).toBeCalled();
    });
});
