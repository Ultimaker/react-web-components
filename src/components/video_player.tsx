/**
 * This component is mainly to handle the player's error and loading state nicely, being able to display something custom in those cases.
 * The react-player component knows much more than youtube and these props, but only these are needed for now. Refer to it's documentation before changing this component.
 */
import * as React from 'react';
import YouTubePlayer from 'react-player/lib/players/YouTube';

import Spinner from "./spinner";

export interface VideoPlayerProps {
    /** url for the react-player component */
    url: string;
    /** Optional width to be given to the container and the video. Will accept values that are valid in CSS */
    width?: string;
    /** Optional height to be given to the container and the video. Will accept values that are valid in CSS */
    height?: string;
}

export interface VideoPlayerState {
    loading: boolean;
    error: boolean;
    invalidUrl: boolean;
}

export default class VideoPlayer extends React.Component<VideoPlayerProps, VideoPlayerState> {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false,
            invalidUrl: !YouTubePlayer.canPlay(this.props.url)
        }

        // bind callbacks once
        this._ready = this._ready.bind(this);
        this._error = this._error.bind(this);
    }

    static defaultProps = {
        width: '100%',
        height: '100%'
    };


    private _ready() {
        this.setState({ loading: false })
    }

    private _error() {
        this.setState({
            loading: false,
            error: true
        });
    }

    private _playerClasses() {
        const { loading, error, invalidUrl } = this.state;
        if (loading || error || invalidUrl) {
            return 'video-player__player video-player__player--hidden'
        } else {
            return 'video-player__player'
        }
    }

    render() {
        const { url, width, height } = this.props;
        const { loading, invalidUrl, error } = this.state;

        const containerStyle = {
            width: width,
            height: height,
        }

        return (
            <div style={containerStyle} className='video-player'>
                {/* The Url is invalid */}
                {invalidUrl && <span className='video-player--invalidUrl'>Can not play Url</span>}
                {/* The Url is valid, but there is an issue with the playback, eg. no internet connection */}
                {!invalidUrl && error && <span className='video-player--error'>Video unavailable</span>}
                {/* The Url is valid, and the video is being loaded */}
                {!invalidUrl && loading && <Spinner />}
                {/* Url is valid, the video will appear when it's ready to be played */}
                {!invalidUrl && <YouTubePlayer
                    className={this._playerClasses()}
                    onReady={this._ready}
                    onError={this._error}
                    url={url}
                    width={width}
                    height={height}
                />}
            </div>
        );
    }
}
