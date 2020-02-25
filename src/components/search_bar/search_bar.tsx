import React from 'react';
import debounce from 'lodash.debounce';
import { v4 as uuidv4 } from 'uuid';
import * as Input from '../input';
import { Icons } from '../icons';

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
    id = uuidv4();

    debouncedEmit = (({ onChange, emitDelay }) => debounce(
        onChange, emitDelay,
    ))(this.props);

    static defaultProps = {
        emitDelay: 0,
        query: '',
    }

    constructor(props: Readonly<SearchBarProps>) {
        super(props);
        const { query } = props;
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

    componentDidUpdate(prevProps: SearchBarProps, prevState: SearchBarState) {
        const { query } = this.props;
        if (query !== prevProps.query && query !== prevState.query) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                query,
            });
        }
    }

    componentWillUnmount() {
        this.debouncedEmit.cancel();
    }

    onChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value: query } = event.target;
        this.setState({
            query,
        }, () => {
            this.debouncedEmit(query);
        });
    }

    render() {
        const { query } = this.state;
        const { id, onChange } = this;
        const { placeholder } = this.props;
        return (
            <div className="search-bar">
                <span className="search-bar__icon">
                    <Icons.MagnifierSmall />
                </span>
                <label htmlFor={id} className="search-bar__label">
                    {placeholder}
                </label>
                <Input.Text
                    className="search-bar__input"
                    id={id}
                    value={query}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            </div>
        );
    }
}

export { SearchBar };
