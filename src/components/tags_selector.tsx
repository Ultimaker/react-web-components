import * as React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import classNames from 'classnames';

export interface TagsSelectorProps {

  suggestions?: string[];
  /** Called when the tag is selected */
  onChangeHandler: (tags: string[]) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Tags that should already be selected */
  defaultTags?: string[]
  /** Disables the selector when true */
  disabled?: boolean;
  /** Whether the tag field should be auto-focused */
  autofocus?: boolean
}

export interface TagsSelectorState {
  tags: Tag[]
  suggestions: Tag[]
  defaultSet: boolean
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

  public static displayName = 'TagsSelector';

  state = {
    tags: [],
    suggestions: [],
    defaultSet: false
  }

  constructor(props) {
    super(props);

    this._handleDelete = this._handleDelete.bind(this);
    this._handleAddition = this._handleAddition.bind(this);
    this._handleDrag = this._handleDrag.bind(this);
  }

  static getDerivedStateFromProps(props: TagsSelectorProps, state: TagsSelectorState): TagsSelectorState {
    let suggestions = []
    let defaultTags = []

    if (props.suggestions && !state.defaultSet) {
      suggestions = TagsSelector._convertStringsToTags(props.suggestions)
    }

    if (props.defaultTags && !state.defaultSet) {
      defaultTags = TagsSelector._convertStringsToTags(props.defaultTags)
    }

    return {
      suggestions: [...suggestions, ...state.suggestions],
      tags: [...defaultTags, ...state.tags],
      defaultSet: true
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
      this.setState({
        tags: updatedTags
      });
      this.props.onChangeHandler(TagsSelector._convertTagsToStrings(updatedTags));
    }
  }

  private _handleAddition(tag: Tag): void {
    const { disabled } = this.props;

    if (!disabled) {
      const { tags } = this.state;
      const updatedTags = [...tags, tag];
      this.setState({ tags: updatedTags });
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

      this.setState({ tags: updatedTags });
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