import * as React from 'react';
import YouTubePlayer from 'react-player/lib/players/YouTube'

import Loading from "./loading";

export interface VideoPlayerProps {
    url: string;
    width?: string;
    height?: string;
}

export interface VideoPlayerState {
    loading: boolean;
}

export default class VideoPlayer extends React.Component<VideoPlayerProps, VideoPlayerState> {
    state = {
        loading: true
    }

    private _ready(){
        this.setState({loading:false})
    }

    private _hide(){
        if (this.state.loading){
            return {display : 'none'}
        }else{
            return {}
        }
    }

    componentDidUpdate(){

    }

    render() {
        const { url, width, height } = this.props;
        const { loading } = this.state;

        const playerProps = {
            onReady: () => this._ready(),
            url: url,
            width: width ? width : '',
            height: height ? height : '',
        };
        

        return (
            <div>
                {!YouTubePlayer.canPlay(url) && 'Cannot play url'}

                {loading && <Loading label='Loading'/>}

                <div style={this._hide()}><YouTubePlayer {...playerProps} /></div>
            </div>
            );
    }
}