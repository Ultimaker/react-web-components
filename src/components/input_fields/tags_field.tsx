import * as React from 'react';

import InputFieldWrapper, {InputFieldProps, StaticFieldProps} from './input_field_wrapper';
import TagsSelector from '../tags_selector';

interface TagsFieldProps extends InputFieldProps {
    /** A list of suggestions for tags input field */
    tagSuggestions?: string[];
    /** If true, the field will be focused when loaded */
    focusOnLoad?: boolean;
}

export const TagsField: React.StatelessComponent<TagsFieldProps> = (
    {id, placeholder, value, onChangeHandler, tagSuggestions, focusOnLoad}
) =>
    <TagsSelector
        id={id}
        onChangeHandler={tags => onChangeHandler(id, tags)}
        placeholder={placeholder}
        suggestions={tagSuggestions}
        value={Array.isArray(value) && value}
        disabled={false}
        autofocus={focusOnLoad}
    />

TagsField.displayName = "TagsField";

interface StaticTagsFieldProps extends StaticFieldProps {
    /** placeholder text */
    placeholder?: string; // TODO: Is the placeholder used in the static view?
}

export const StaticTagsField: React.StatelessComponent<StaticTagsFieldProps> = ({value, placeholder}) =>
    <TagsSelector
        id={null}
        onChangeHandler={null}
        placeholder={placeholder}
        suggestions={[]}
        value={Array.isArray(value) && value}
        disabled={true}
        autofocus={false}
    />

StaticTagsField.displayName = "StaticTagsField";

export default InputFieldWrapper(TagsField, StaticTagsField);
