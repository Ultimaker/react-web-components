// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow, mount } from 'enzyme';

// component
import FormActions from '../form_actions';
import Button from '../button';

describe('The form actions component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <FormActions>
                <Button>First Button</Button>
                <Button>Second Button</Button>
            </FormActions>
        );
    });

    it('should render its children', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
