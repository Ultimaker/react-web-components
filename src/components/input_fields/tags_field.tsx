import * as React from 'react'
import classNames from 'classnames'

import InputFieldWrapper, {InputFieldProps} from './input_field_wrapper'
import TagsSelector from '../tags_selector'

    /** A list of suggestions for tags input field */
    tagSuggestions?: string[]

export const TagsField: React.StatelessComponent<InputFieldProps> = ({}) => <div />

        private _renderTagsSelector() {
            const {id, placeholder, value, onChangeHandler, tagSuggestions, staticField, focusOnLoad} = this.props;

            return <TagsSelector
                id={id}
                onChangeHandler={onChangeHandler}
                placeholder={placeholder}
                suggestions={tagSuggestions}
                value={Array.isArray(value) && value}
                disabled={staticField}
                autofocus={focusOnLoad}
            />
        }

TagsField.displayName = "TagsField";

export default InputFieldWrapper(TagsField)
