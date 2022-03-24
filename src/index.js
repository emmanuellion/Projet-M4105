import './css/index.scss';
import { radios } from './exports/radios-big.mjs';
import React from 'react';
import ReactDOM from 'react-dom';
import { ListTag } from './exports/ListTag.js';
import { Player } from './exports/Player.js';
import pauseBtn from './img/pause.png'; 

import { Importe } from './exports/base.js';

let constraints = [];
let size_constraints = constraints.length;
let map = {};

const images = Importe();

class App extends React.Component {
    constructor(){
        super();
        let tab = [];
        if(localStorage.getItem('radio') === null){
            localStorage.setItem('radio', JSON.stringify({
                'favs': [],
                'last': [],
                'more': []
            }));
        }else{
            for(let fav of JSON.parse(localStorage.getItem('radio')).favs){
                for(let rad of radios.list){
                    if(rad.name === fav.load.u){
                        tab.push(rad);
                    }
                }
            }
        }
        this.state = {
            constraints: constraints,
            size_constraints: size_constraints,
            map: map,
            radios: radios,
            rand: false,
            dis: this,
            lst_rad: tab,
            radio: new Audio(),
            show: false,
            dataRadio: {},
            images: images
        };
    }

    contraint(dis){
        let tmp = [];
        for(let item of dis.state.radios.list){
            for(let cat of item.tags){
                if(dis.state.constraints.includes(cat)){
                    tmp.push(item);
                    break;
                }
            }
        }
        if(dis.state.rand){
            let random = Math.floor(Math.random() * tmp.length);
            let radio = tmp[random];
            dis.playAudio(radio);
        }else{
            dis.setState({lst_rad: tmp});
            dis.state.size_constraints = dis.state.constraints.length;
        }
    }

    playAudio(audio){
        document.querySelector('#carre').style.width = "45%";
        document.querySelector('#carre').style.height = "45%";
        this.setState({show: true});
        let tmp = this.state.radio;
        tmp.src = audio.url;
        this.setState({radio: tmp});
        let str = "";
        this.state.radio.addEventListener('loadstart', () => {
                str = "Audio en cours de chargement ...";
                this.setState({dataRadio: {
                    load: {
                        texte: str,
                        u: null
                    },
                    img: {
                        src: l,
                        alt: 'logo '+audio.name
                    },
                    tags: ar,
                    ico: pauseBtn
                }});
        });
        this.state.radio.addEventListener('canplay', () => {
                this.setState({dataRadio: {
                    load: {
                        texte: "Vous écoutez actuellement ",
                        u: audio.name
                    },
                    img: {
                        src: l,
                        alt: 'logo '+audio.name
                    },
                    tags: ar,
                    ico: pauseBtn
                }});
                this.state.radio.play();
        });
        this.state.radio.addEventListener('error', () => {
                this.setState({dataRadio: {
                    load: {
                        texte: null,
                        u: "L'audio ne peut pas être lu ! Veuillez changer de radio !"
                    },
                    img: {
                        src: l,
                        alt: 'logo '+audio.name
                    },
                    tags: ar,
                    ico: pauseBtn
                }});
        });
        let l = images['No_image.png']
        if(audio.img !== 'empty.png'){
            l = images[audio.img]
        }
        let ar = [];
        for(let tag in audio.tags){
            ar.push(audio.tags[tag]);
        }
        this.setState({dataRadio: {
                load: {
                    texte: "",
                    u: ""
                },
                img: {
                    src: l,
                    alt: 'logo '+audio.name
                },
                tags: ar,
                ico: pauseBtn
        }});
    }

    render(){
        return(
            <>
                <ListTag contraint={this.contraint} value={this.state} />
                <Player value={this.state} />
            </>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
