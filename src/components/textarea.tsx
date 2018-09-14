import * as React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import classNames from 'classnames';

export interface TextareaProps {
    /** Textarea id. Must be unique */
    id: string;
    /** The value of the checkbox */
    value: string;
    /** Called when the checkbox is clicked */
    onChangeHandler: (value: string) => void;
    /** When true the error state will be displayed */
    error?: boolean;
    /** Whether the textarea should grow horizontally with user input */
    autoGrow?: boolean;
    /** html placeholder text */
    placeholder?: string;
    /** Whether the textarea should be auto-focused */
    autofocus?: boolean;
}

export class Textarea extends React.Component<TextareaProps, {}> {

    private inputRef;

    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

    componentDidMount(): void {
        this._focusOnPromptInput();
    }

    _focusOnPromptInput(): void {
        const { autofocus } = this.props;

        if (this.inputRef.current && autofocus) {
            this.inputRef.current.focus();
        }
    }

    render(): JSX.Element {
        const { id, value, onChangeHandler, error, autoGrow, placeholder, autofocus } = this.props;
        const classes = classNames('input', { error });

        return (
            <div className="textarea">
                {autoGrow &&
                    <TextareaAutosize
                        id={id}
                        value={value}
                        className={classes}
                        placeholder={placeholder}
                        minRows={3}
                        autoFocus={autofocus}
                        onChange={e => onChangeHandler(e.target.value)}
                    />
                }
                {!autoGrow &&
                    <textarea
                        id={id}
                        name={id}
                        onChange={e => onChangeHandler(e.target.value)}
                        placeholder={placeholder}
                        className={classes}
                        ref={this.inputRef}
                        value={value}
                        rows={3}
                    />
                }
            </div>
        )
    }
}

export default Textarea;
