import * as React from 'react';
import classNames from 'classnames';

const ReactTags = require('react-tag-autocomplete');

export interface TagsSelectorProps {
    /** The TagsSelector id */
    id?: string;
    /** An array of suggested tags used for the autocomplete */
    suggestions?: string[];
    /** Called when the tag is selected */
    onChangeHandler: (tags: string[]) => void;
    /** Placeholder name */
    placeholder?: string;
    /** List of strings to be converted into tags */
    value: string[]
    /** Disables the selector when true */
    disabled?: boolean;
    /** Whether the tag field should be auto-focused */
    autofocus?: boolean;
}

export interface TagsSelectorState {
    tags: Tag[];
    suggestions: Tag[];
}

export interface Tag {
    id: string,
    name: string
}

const keyCodes = {
    comma: 188,
    enter: 13,
    space: 32,
};

const delimiters = [keyCodes.comma, keyCodes.enter, keyCodes.space];

export class TagsSelector extends React.Component<TagsSelectorProps, TagsSelectorState> {
    static convertStringsToTags(strings: string[]): Tag[] {
        if (strings) {
            const tags: Tag[] = [];
            strings.forEach((string) => {
                tags.push({ id: string, name: string });
            });
            return tags;
        }
        return [];
    }

    static convertTagsToStrings(tags: Tag[]): string[] {
        const strings: string[] = [];
        tags.forEach((tag) => {
            strings.push(tag.name);
        });
        return strings;
    }

    static defaultProps = {
        autofocus: false,
    };

    state = {
        tags: [],
        suggestions: [],
    }

    constructor(props) {
        super(props);

        this._handleDelete = this._handleDelete.bind(this);
        this._handleAddition = this._handleAddition.bind(this);
    }

    static getDerivedStateFromProps(
        props: TagsSelectorProps, state: TagsSelectorState,
    ): TagsSelectorState {
        let updatedSuggestions: Tag[] = null;
        let updatedTags: Tag[] = null;

        // convert tag strings to tag objects
        const convertedSuggestionTags: Tag[] = TagsSelector.convertStringsToTags(props.suggestions);
        const convertedTags: Tag[] = TagsSelector.convertStringsToTags(props.value);

        if (convertedSuggestionTags !== state.suggestions) {
            updatedSuggestions = convertedSuggestionTags;
        }

        if (convertedTags !== state.tags) {
            updatedTags = convertedTags;
        }

        return {
            suggestions: updatedSuggestions,
            tags: updatedTags,
        };
    }

    private _handleDelete(i: number): void {
        const { disabled, onChangeHandler } = this.props;

        if (!disabled) {
            const { tags } = this.state;
            const updatedTags = tags.filter((tag, index) => index !== i);
            onChangeHandler(TagsSelector.convertTagsToStrings(updatedTags));
        }
    }

    private _handleAddition(tag: Tag): void {
        const { disabled, onChangeHandler } = this.props;

        if (!disabled) {
            const { tags } = this.state;
            const updatedTags = [...tags, tag];
            onChangeHandler(TagsSelector.convertTagsToStrings(updatedTags));
        }
    }

    render(): JSX.Element {
        const { tags, suggestions } = this.state;
        const {
            id, placeholder, disabled, autofocus,
        } = this.props;

        const classes = classNames('tags-selector', { disabled });

        return (
            <div id={id} className={classes}>
                <ReactTags
                    tags={tags}
                    suggestions={suggestions}
                    handleDelete={this._handleDelete}
                    handleAddition={this._handleAddition}
                    delimiters={delimiters}
                    placeholder={placeholder}
                    autofocus={autofocus}
                    maxLength={30}
                    allowNew
                />
            </div>
        );
    }
}

export default TagsSelector;
