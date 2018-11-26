// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// components
import Carousel from '../carousel';
import UM3PrinterIcon from '../icons/um3_printer_icon'
import UM3XPrinterIcon from '../icons/um3x_printer_icon'
import UMS5PrinterIcon from '../icons/ums5_printer_icon'


describe('The carousel component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            responsive: {
                0: {items: 1},
                620: {items: 2},
                800: {items: 3},
                1025: {items: 4},
            },
        }
        wrapper = shallow(
            <Carousel {...props}>
                <UM3PrinterIcon size="lg" />
                <UM3XPrinterIcon size="lg" />
                <UMS5PrinterIcon size="lg" />
            </Carousel>
        );
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
