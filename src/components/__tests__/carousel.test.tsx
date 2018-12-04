// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// components
import AliceCarousel from 'react-alice-carousel';
import Carousel from '../carousel';
import Grid from '../grid';
import UM3PrinterIcon from '../icons/um3_printer_icon';
import UM3XPrinterIcon from '../icons/um3x_printer_icon';
import UMS5PrinterIcon from '../icons/ums5_printer_icon';
import GridItem from '../grid_item';


describe('The carousel component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = { itemCounts: [1, 2, 3] };
        wrapper = shallow(
            <Carousel {...props}>
                <UM3PrinterIcon size="lg" />
                <UM3XPrinterIcon size="lg" />
                <UMS5PrinterIcon size="lg" />
            </Carousel>,
        );
    });

    it('should render a carousel', () => {
        props.itemCounts = [1, 2];
        wrapper.setProps(props);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(AliceCarousel)).toHaveLength(1);
        expect(wrapper.find(AliceCarousel).prop('children')).toHaveLength(3);
        expect(wrapper.find(Grid)).toHaveLength(0);
    });

    it('should render a grid', () => {
        props.itemCounts = [3, 3, 4, 4];
        wrapper.setProps(props);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(AliceCarousel)).toHaveLength(0);
        expect(wrapper.find(Grid)).toHaveLength(1);
        expect(wrapper.find(GridItem)).toHaveLength(3);
    });

    it('should render a grid and a carousel', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(AliceCarousel)).toHaveLength(1);
        expect(wrapper.find(Grid)).toHaveLength(1);
        expect(wrapper.find(GridItem)).toHaveLength(3);
    });
});
