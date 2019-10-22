// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import { GenericFlowPage, GenericFlowPageProps } from '../generic_flow_page';
import Spinner from '../spinner';

describe('The GenericFlowPage component', () => {
    let props: GenericFlowPageProps;
    let wrapper;

    beforeEach(() => {
        props = {
            title: 'Cloud connectivity enabled',
            description: 'Sign in with your Ultimaker account to continue.',
            image: <img className="cloud-connecting-image" src="../../images/cloud_connection/cloud_connecting-image.svg" alt="cloud-connecting" />,
            children: <Spinner />,
        };
        wrapper = shallow(<GenericFlowPage {...props} />);
    });

    it('should render without an application name', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render with an application name "My Account"', () => {
        props.appName = 'My Account';
        wrapper.setProps(props);
        expect(wrapper).toMatchSnapshot();
    });
});
