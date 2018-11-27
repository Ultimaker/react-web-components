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
    static defaultProps = {
        width: '100%',
        height: '100%'
    };

    state = {
        loading: true,
        error: false,
        invalidUrl: false
    }

    private _ready() {
        this.setState({ loading: false })
    }

    private _error(e) {
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

    componentDidMount() {
        if (!YouTubePlayer.canPlay(this.props.url)) {
            this.setState({
                loading: false,
                invalidUrl: true
            });
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
                {invalidUrl && <span className='video-player--invalidUrl'>Can not play Url</span>}
                {error && <span className='video-player--error'>Video unavailable</span>}
                {loading && <Spinner />}
                <YouTubePlayer
                    className={this._playerClasses()}
                    onReady={() => this._ready()}
                    onError={(e) => this._error(e)}
                    url={url}
                    width={width}
                    height={height}
                />
            </div>
        );
    }
}
