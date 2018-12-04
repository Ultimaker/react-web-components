/**
 * This component is mainly to handle the player's error and loading state nicely, being able to display something custom in those cases.
 * The react-player component knows much more than youtube and these props, but only these are needed for now. Refer to it's documentation before changing this component.
 */
import * as React from 'react';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import classNames = require('classnames');

// utils
import { I18n } from '../utils/i18n'

// component
import Spinner from "./spinner";

export interface VideoPlayerProps {
    /** url for the react-player component */
    url: string;
    /** css classes to pass down to the container  */
    className?: string;
    /** Optional width to be given to the container and the video. Will accept values that are valid in CSS */
    width?: string;
    /** Optional height to be given to the container and the video. Will accept values that are valid in CSS */
    height?: string;
}

export interface VideoPlayerState {
    loading: boolean;
    error: boolean;
}

export default class VideoPlayer extends React.Component<VideoPlayerProps, VideoPlayerState> {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false,
        }

        // bind callbacks once
        this._ready = this._ready.bind(this);
        this._error = this._error.bind(this);
    }

    static defaultProps = {
        width: '100%',
        height: '100%'
    };

    componentDidUpdate(prevProps: VideoPlayerProps): void {
        if (prevProps.url !== this.props.url) {
            this.setState({ loading: true });
        }
    }

    private _ready(): void {
        this.setState({ loading: false })
    }

    private _error(): void {
        this.setState({
            loading: false,
            error: true
        });
    }

    private _displaySpinner(invalidUrl: boolean): JSX.Element {
        if (!invalidUrl && this.state.loading) {
            return <Spinner />
        }
    }

    private _displayPlaybackError(invalidUrl: boolean): JSX.Element {
        if (!invalidUrl && this.state.error) {
            return <span className='video-player__error'>{I18n.translate('Video player - Video unavailable', 'Video unavailable')}</span>
        }
    }

    private _displayUrlError(invalidUrl: boolean): JSX.Element {
        if (invalidUrl) {
            return <span className='video-player__invalidUrl'>{I18n.translate('Video player - Video unavailable', 'Can not play Url')}</span>
        }
    }


    render(): JSX.Element {
        const { url, width, height, className } = this.props;
        const { loading, error } = this.state;
        const containerStyle = {
            width: width,
            height: height,
        }
        const invalidUrl = !YouTubePlayer.canPlay(this.props.url);
        const playerClasses = loading || error || invalidUrl ? 'video-player__player video-player__player--hidden' : 'video-player__player';
        const containerClasses = classNames('video-player', className);

        return (
            <div style={containerStyle} className={containerClasses}>
                {this._displayUrlError(invalidUrl)}
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
                                rel: 0
                            }
                        }
                    }}
                />
            </div>
        );
    }
}
