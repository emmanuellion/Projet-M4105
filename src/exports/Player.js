import React, { Component } from 'react';
import playBtn from '../img/play.png';
import pauseBtn from '../img/pause.png';
import { AudioHandler } from './AudioHandler.js';
import { ListRadio } from './ListRadio.js';

export class Player extends Component {
    
    handleAudio(){
        let but;
        if(this.props.value.radio.paused){
            console.log("play the audio");
            but = pauseBtn;
            this.props.value.radio.play();
        }else{
            console.log("Stop the audio");
            but = playBtn;
            this.props.value.radio.pause();
        }
        this.props.value.dis.setState({dataRadio: {
            load: {
                texte: this.props.value.dataRadio.load.texte,
                u: this.props.value.dataRadio.load.u
            },
            img: {
                src: this.props.value.dataRadio.img.src,
                alt: this.props.value.dataRadio.img.alt
            },
            tags: this.props.value.dataRadio.tags,
            ico: but
         }});
    }

    change(){
        let tmp = this.props.value.radio;
        tmp.volume = parseInt(document.querySelector('#volume').value)/100;
        this.props.value.radio = tmp;
    }

    addFav(fav){
        let data = JSON.parse(localStorage.getItem('radio'));
        if(data.favs.length === 5){
            data.favs.shift();
        }
        data.favs.push(fav)
        localStorage.setItem('radio', JSON.stringify(data));
        console.log(data.favs)
    }

    reset(audio, dis){
        for(let rad of dis.props.value.dis.state.radios.list){
            if(rad.name === audio.load.u){
                dis.props.value.dis.playAudio(rad)
            }
        }
    }

    render(){
        return (
            <div id="display">
                <div id="canvas">
                    <h1 id="nb">{this.props.value.lst_rad.length} éléments trouvés</h1>
                    <ListRadio value={{rad: this.props.value.lst_rad, img: this.props.value.images, dis: this.props.value.dis}} />
                    {this.props.value.show && <AudioHandler
                        value={{da: this.props.value.dataRadio, fav: this.addFav, reset: this.reset, dis: this}}
                        onClick={() => this.handleAudio()}
                        onChange={() => this.change()}
                        />
                    }
                </div>
            </div>
        );
    }
}