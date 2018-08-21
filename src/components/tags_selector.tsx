import * as React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import classNames from 'classnames';

export interface TagsSelectorProps {

  suggestions?: string[];
  /** Called when the tag is selected */
  onChangeHandler: (tags: string[]) => void;
  /** Placeholder text */
  placeholder?: string;
  /** List of strings to be converted into tags */
  value: string[]
  /** Disables the selector when true */
  disabled?: boolean;
  /** Whether the tag field should be auto-focused */
  autofocus?: boolean
}

export interface TagsSelectorState {
  tags: Tag[]
  suggestions: Tag[]
}

export interface Tag {
  id: string,
  text: string
}

const keyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [keyCodes.comma, keyCodes.enter];

export class TagsSelector extends React.Component<TagsSelectorProps, TagsSelectorState> {

  state = {
    tags: [],
    suggestions: []
  }

  constructor(props) {
    super(props);

    this._handleDelete = this._handleDelete.bind(this);
    this._handleAddition = this._handleAddition.bind(this);
    this._handleDrag = this._handleDrag.bind(this);
  }

  static getDerivedStateFromProps(props: TagsSelectorProps, state: TagsSelectorState): TagsSelectorState {
    let newSuggestions: Tag[] = null;
    let newTags: Tag[] = null;

    const convertedSuggestionTags: Tag[] = props.suggestions && TagsSelector._convertStringsToTags(props.suggestions);
    const convertedTags: Tag[] = props.value && TagsSelector._convertStringsToTags(props.value);

    if (convertedSuggestionTags !== state.suggestions) {
      newSuggestions = convertedSuggestionTags
    }

    if (convertedTags !== state.tags) {
      newTags = convertedTags
    }

    return {
      suggestions: newSuggestions,
      tags: newTags
    }
  }

  static _convertStringsToTags(strings: string[]): Tag[] {
    let tags: Tag[] = [];
    strings.forEach(string => {
      tags.push({ id: string, text: string });
    })
    return tags
  }

  static _convertTagsToStrings(tags: Tag[]): string[] {
    let strings: string[] = [];
    tags.forEach(tag => {
      strings.push(tag.text)
    })
    return strings
  }

  private _handleDelete(i: number): void {
    const { disabled } = this.props;

    if (!disabled) {
      const { tags } = this.state;
      const updatedTags = tags.filter((tag, index) => index !== i);
      this.props.onChangeHandler(TagsSelector._convertTagsToStrings(updatedTags));
    }
  }

  private _handleAddition(tag: Tag): void {
    const { disabled } = this.props;

    if (!disabled) {
      const { tags } = this.state;
      const updatedTags = [...tags, tag];
      this.props.onChangeHandler(TagsSelector._convertTagsToStrings(updatedTags));
    }
  }

  private _handleDrag(tag: Tag, currPos: number, newPos: number): void {
    const { disabled } = this.props;

    if (!disabled) {
      const tags = [...this.state.tags];
      const updatedTags = tags.slice();

      updatedTags.splice(currPos, 1);
      updatedTags.splice(newPos, 0, tag);

      this.props.onChangeHandler(TagsSelector._convertTagsToStrings(updatedTags));
    }
  }


  render(): JSX.Element {
    const { tags, suggestions } = this.state;
    const { placeholder, disabled, autofocus } = this.props;

    const classes = classNames('tags-selector', { disabled });

    return <div className={classes}>
      <ReactTags tags={tags}
        suggestions={suggestions}
        handleDelete={this._handleDelete}
        handleAddition={this._handleAddition}
        handleDrag={!disabled ? null : this._handleDrag}
        delimiters={delimiters}
        placeholder={placeholder}
        autofocus={autofocus}
        maxLength={30} />
    </div>
  }

}

export default TagsSelector;