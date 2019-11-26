import React from 'react';
import debounce from 'lodash.debounce';
import * as Input from '../input';
import * as Icon from '../icons';

interface SearchBarProps {
    query?: string;
    emitDelay?: number;
    onChange: (value: string) => void;
    placeholder?: string;
}

interface SearchBarState {
    query: string;
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
    static defaultProps = {
        emitDelay: 0,
    }

    debouncedEmit = (({ onChange, emitDelay }) => debounce(
        onChange, emitDelay,
    ))(this.props);

    constructor(props: Readonly<SearchBarProps>) {
        super(props);
        const { query = '' } = props;
        this.state = {
            query,
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        const { query } = this.state;
        if (query !== '') {
            this.debouncedEmit(query);
        }
    }

    componentWillUnmount() {
        this.debouncedEmit.cancel();
    }

    onChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value: query } = event.target;

        this.setState({
            query,
        });
        event.persist();
        this.debouncedEmit(query);
    }

    render() {
        const { query } = this.state;
        const { onChange } = this;
        const { placeholder } = this.props;
        return (
            <div className="search-bar">
                <span className="search-bar__icon">
                    <Icon.MagnifierSmall />
                </span>
                <Input.Text
                    className="search-bar__input"
                    value={query}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            </div>
        );
    }
}

export { SearchBar };
