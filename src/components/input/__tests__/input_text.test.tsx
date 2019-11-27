import React from 'react';
import { shallow } from 'enzyme';
import * as Input from '..';

describe('input_text.tsx:', () => {
    test('snapshot', () => {
        expect(
            shallow(<Input.Text />),
        ).toMatchSnapshot();
    });
});
