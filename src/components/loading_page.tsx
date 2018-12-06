import * as React from 'react';

import Spinner from './spinner';

/**
 * The props of this component.
 */
export interface LoadingPageProps {
    /**
     * The page will only show the spinner if it is rendered for this amount of milliseconds.
     * This way we can avoid flashing the spinner in fast pages,
     * and only show it when it takes long.
     */
    timeoutMs?: number,
}

/**
 * The state of this component.
 */
export interface LoadingPageState {
    /**
     * When timed out the spinner is shown.
     */
    isTimedOut: boolean,
}

/**
 * A page with a loading spinner.
 */
export default class LoadingPage extends React.Component<LoadingPageProps, LoadingPageState> {
    /** The timer that will time out the page and show the spinner */
    private _timeout: any = null;

    state = {
        isTimedOut: false,
    }

    static defaultProps = {
        timeoutMs: 500,
    }

    constructor(props: LoadingPageProps) {
        super(props);
        this._onTimeout = this._onTimeout.bind(this);
    }

    componentDidMount(): void {
        const { timeoutMs } = this.props;
        this._timeout = setTimeout(this._onTimeout, timeoutMs);
    }

    componentWillUnmount(): void {
        if (this._timeout) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
    }

    private _onTimeout() {
        this._timeout = null;
        this.setState({ isTimedOut: true });
    }

    render(): JSX.Element {
        const { isTimedOut } = this.state;
        return (
            <div className="loading-page">
                {isTimedOut && <Spinner />}
            </div>
        );
    }
}
