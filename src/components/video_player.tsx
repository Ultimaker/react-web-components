/**
 * This component is mainly to handle the player's error and loading state nicely,
 * being able to display something custom in those cases.
 * The react-player component knows much more than youtube and these props,
 * but only these are needed for now. Refer to it's documentation before changing this component.
 */
import * as React from 'react';
import YouTubePlayer from 'react-player/lib/players/YouTube';

// utils
import { I18n } from '../utils/i18n';

// component
import Spinner from './spinner';

import classNames = require('classnames');

export interface VideoPlayerProps {
    /** url for the react-player component */
    url: string;
    /** css classes to pass down to the container  */
    className?: string;
    /** Optional width to be given to the container and the video.
     * Will accept values that are valid in CSS */
    width?: string;
    /** Optional height to be given to the container and the video.
     * Will accept values that are valid in CSS */
    height?: string;
}

export interface VideoPlayerState {
    loading: boolean;
    error: boolean;
}

export default class VideoPlayer extends React.Component<VideoPlayerProps, VideoPlayerState> {
    static defaultProps = {
        width: '100%',
        height: '100%',
    };

    private static _displayUrlError(invalidUrl: boolean): JSX.Element {
        if (invalidUrl) {
            return <span className="video-player__invalidUrl">{I18n.translate('Video player - Video unavailable', 'Can not play Url')}</span>;
        }
        return null;
    }

    state = {
        loading: true,
        error: false,
    };

    constructor(props) {
        super(props);

        // bind callbacks once
        this._ready = this._ready.bind(this);
        this._error = this._error.bind(this);
    }

    componentDidUpdate(prevProps: VideoPlayerProps): void {
        const { url } = this.props;
        if (prevProps.url !== url) {
            this._loading();
        }
    }

    private _loading() {
        this.setState({ loading: true });
    }

    private _ready(): void {
        this.setState({ loading: false });
    }

    private _error(): void {
        this.setState({
            loading: false,
            error: true,
        });
    }

    private _displaySpinner(invalidUrl: boolean): JSX.Element {
        const { loading } = this.state;
        if (!invalidUrl && loading) {
            return <Spinner />;
        }
        return null;
    }

    private _displayPlaybackError(invalidUrl: boolean): JSX.Element {
        const { error } = this.state;
        if (!invalidUrl && error) {
            return <span className="video-player__error">{I18n.translate('Video player - Video unavailable', 'Video unavailable')}</span>;
        }
        return null;
    }


    render(): JSX.Element {
        const {
            url, width, height, className,
        } = this.props;
        const { loading, error } = this.state;
        const containerStyle = {
            width,
            height,
        };
        const invalidUrl = !YouTubePlayer.canPlay(url);
        const playerClasses = loading || error || invalidUrl ? 'video-player__player video-player__player--hidden' : 'video-player__player';
        const containerClasses = classNames('video-player', className);

        return (
            <div style={containerStyle} className={containerClasses}>
                {VideoPlayer._displayUrlError(invalidUrl)}
                {this._displayPlaybackError(invalidUrl)}
                {this._displaySpinner(invalidUrl)}
                <YouTubePlayer
                    className={playerClasses}
                    onReady={this._ready}
                    onError={this._error}
                    url={url}
                    width={width}
                    height={height}
                    config={{
                        youtube: {
                            playerVars: {
                                modestbranding: 1,
                                controls: 1,
                                rel: 0,
                            },
                        },
                    }}
                />
            </div>
        );
    }
}
