import * as React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

export interface TagsSelectorProps {
  suggestions?: string[];
  onChangeHandler: (tags: string[]) => void;
  placeholder?: string;
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

  static getDerivedStateFromProps(props, state) {
    if (props.suggestions && state.suggestions.length === 0) {
      let suggestions: Tag[] = [];
      props.suggestions.forEach(tag => {
        suggestions.push({ id: tag, text: tag });
      })

      return {
        suggestions
      }
    }

    return null
  }

  private _handleDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  private _handleAddition(tag) {
    const { tags } = this.state;
    this.setState({ tags: [...tags, tag] });

    let texts: string[] = [];
    [...tags, tag].forEach(tag => {
      texts.push(tag.text)
    })
    this.props.onChangeHandler(texts);
  }

  private _handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
  }


  render(): JSX.Element {
    const { tags, suggestions } = this.state;
    const { placeholder } = this.props;
    
    return <div className="tags-selector">
      <ReactTags tags={tags}
        suggestions={suggestions}
        handleDelete={this._handleDelete}
        handleAddition={this._handleAddition}
        handleDrag={this._handleDrag}
        delimiters={delimiters}
        placeholder={placeholder} />
    </div>
  }

}

export default TagsSelector;