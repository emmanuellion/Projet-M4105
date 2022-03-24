import No_sound from '../img/no_sound.png';
import Sound from '../img/sound.png';
import { FavHandler } from './FavHandler';

import React, { Component } from 'react';

export class AudioHandler extends Component {
    
  render() {
    return(
        <>
            <div className="play" id="cat">
                {this.props.value.da.tags.map((item, index) => (
                    <span className="tag" key={index}>
                        {item}
                    </span>
                ))}
            </div>
            <img src={this.props.value.da.img.src} alt={this.props.value.da.img.alt} id="logo" className="play" />
            <h3 id="title" className="play">{this.props.value.da.load.texte}<span>{this.props.value.da.load.u}</span></h3>
            <img
                src={this.props.value.da.ico}
                alt="play/pause"
                onClick={this.props.onClick}
                className="play"
                id="but" />
            <img
                src={No_sound}
                alt="sound off"
                className="play"
                id="no-sound" />
            <input
                type="range"
                min="0"
                max="100"
                step="1"
                className="play"
                id="volume"
                onChange={this.props.onChange} />
            <img
                src={Sound}
                alt="sound on"
                className="play"
                id="sound" />
            <FavHandler onClick={() => this.props.value.fav(this.props.value.da)} value={false}/>
            <button className="play" id="restart" onClick={() => this.props.value.reset(this.props.value.da, this.props.value.dis)}>Restart</button>
        </>
    );
  }
}