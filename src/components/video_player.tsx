import * as React from 'react';
/** this component knows much more than youtube, but only that is needed for now */
import YouTubePlayer from 'react-player/lib/players/YouTube'

import Spinner from "./spinner";

export interface VideoPlayerProps {
    /** url for the react-player component */
    url: string;
    /** optional width to be given to the container and the video */
    width?: string;
    /** optional height to be given to the container and the video */
    height?: string;
}

export interface VideoPlayerState {
    loading: boolean;
    error: boolean;
    wrongUrl: boolean;
}

export default class VideoPlayer extends React.Component<VideoPlayerProps, VideoPlayerState> {
    static defaultProps = {
        width: '100%',
        height: '100%'
    };

    state = {
        loading: true,
        error: false,
        wrongUrl: false
    }

    private _ready() {
        this.setState({ loading: false })
    }

    private _error() {
        this.setState({ error: true })
    }

    private _playerClasses() {
        if (this.state.loading) {
            return 'video-player--player video-player--player__hidden'
        } else {
            return 'video-player--player'
        }
    }

    componentDidMount(){
        if (!YouTubePlayer.canPlay(this.props.url)){
            this.setState({
                loading:false,
                wrongUrl: true
            });
        }
    }

    render() {
        const { url, width, height } = this.props;
        const { loading, wrongUrl } = this.state;

        const playerProps = {
            className: this._playerClasses(),
            onReady: () => this._ready(),
            onError: () => this._error(),
            url: url,
            width: width ? width : '',
            height: height ? height : '',
        };
        const containerStyle = {
            width: width ? width : '',
            height: height ? height : '',
        }

        return (
            <div style={containerStyle} className='video_player'>
                {wrongUrl && 'Can not load Url'}

                {loading && <Spinner />}

                <YouTubePlayer {...playerProps} />
            </div>
        );
    }
}
