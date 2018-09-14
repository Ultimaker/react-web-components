// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import TagsSelector from '../tags_selector';

describe('The TagsSelector component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            value: ['tag 1', 'tag 2'],
            onChangeHandler: jest.fn(),
        };
        wrapper = shallow(<TagsSelector {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onChangeHandler).not.toHaveBeenCalled();
        expect(wrapper.state('tags')).toEqual([
            {
                id: 'tag 1',
                text: 'tag 1'
            },
            {
                id: 'tag 2',
                text: 'tag 2'
            }
        ]);
    });

    it('should add suggestions', () => {
        wrapper.setProps({ suggestions: ['suggestion tag 1', 'suggestion tag 2'] });
        expect(wrapper.state('suggestions')).toEqual([
            {
                id: 'suggestion tag 1',
                text: 'suggestion tag 1'
            },
            {
                id: 'suggestion tag 2',
                text: 'suggestion tag 2'
            }
        ]);
    });

    it('should handle adding a tag', () => {
        wrapper.instance()._handleAddition({
            id: 'tag 3',
            text: 'tag 3'
        });
        expect(props.onChangeHandler).toHaveBeenCalledWith(['tag 1', 'tag 2', 'tag 3']);
    });

    it('should handle changing tags order', () => {
        wrapper.instance()._handleDrag({
            id: 'tag 1',
            text: 'tag 1'
        }, 0, 1);
        expect(props.onChangeHandler).toHaveBeenCalledWith(['tag 2', 'tag 1']);
    });

    it('should handle deleting a tag', () => {
        wrapper.instance()._handleDelete(1);
        expect(props.onChangeHandler).toHaveBeenCalledWith(['tag 1']);
    });

    it('should disable the tags', () => {
        wrapper.setProps({ disabled: true });
        expect(wrapper.find('.disabled')).toHaveLength(1);

        wrapper.instance()._handleAddition({
            id: 'tag 3',
            text: 'tag 3'
        });
        expect(props.onChangeHandler).not.toHaveBeenCalled();

        wrapper.instance()._handleDrag({
            id: 'tag 1',
            text: 'tag 1'
        }, 0, 1);
        expect(props.onChangeHandler).not.toHaveBeenCalled();

        wrapper.instance()._handleDelete(1);
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

});
