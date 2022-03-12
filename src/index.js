import './css/index.scss';
import { radios } from './exports/radios-big.mjs';
import React from 'react';
import ReactDOM from 'react-dom';
import { Remove, Importe } from './exports/base.js';
import playBtn from './img/play.png';
import pauseBtn from './img/pause.png';
let constraints = [];
let size_constraints = constraints.length;
let map = {};

const images = Importe();

class Lst extends React.Component {
    constructor(){
        super();
        this.state = {
            lst_orig: {},
            lst_cat: []
        };
        this.init();
    }

    init(){
        for(let item of radios.list){
            for(let cat of item.tags){
                if(!this.state.lst_cat.includes(cat)){
                    this.state.lst_cat.push(cat);
                    map[cat] = 0;
                }
            }
        }
    }

    handleConstraint(li){
        let tag = li.dataset.tag;
        if(map[tag] % 2 === 0){
            li.classList.add('active');
            constraints.push(tag)
        }else{
            li.classList.remove('active');
            constraints = Remove(constraints, tag);
        }
        map[tag]++;
    }

    render(){
        return (
            <div id="lst_rad">
                <ul>
                    {this.state.lst_cat.map((item, index) => (
                        <li 
                            key={index} 
                            data-tag={item} 
                            id={item} 
                            onClick={
                                () => this.handleConstraint(document.querySelector("[data-tag=\""+item+"\"]"))
                            }
                        >{item}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

class Player extends React.Component {
    constructor(){
        super();
        this.state = {
            lst_rad: [],
            radio: new Audio()
        };
        this.init();
    }

    init(){
        let dis = this;
        setInterval(function(){
            if(size_constraints !== constraints.length){
                let tmp = [];
                for(let item of radios.list){
                    for(let cat of item.tags){
                        if(constraints.includes(cat)){
                            tmp.push(item);
                            break;
                        }
                    }
                }
                dis.setState({lst_rad: tmp});
                size_constraints = constraints.length;
            }
        }, 10);
    }
    
    playAudio(audio){
        document.querySelectorAll('.play').forEach(el => {
            el.style.display = "block";
        })
        let logo = document.querySelector('#logo');
        let title = document.querySelector('#title');
        let cat = document.querySelector('#cat');
        let but = document.querySelector('#but');
        let tmp = this.state.radio;
        tmp.src = audio.url;
        this.setState({radio: tmp});
        this.state.radio.addEventListener('loadstart', () => {
            title.childNodes[1].textContent = "Audio en cours de chargement ...";
        });
        this.state.radio.addEventListener('canplay', () => {
            title.childNodes[1].textContent = audio.name;
            this.state.radio.play();
        });
        this.state.radio.addEventListener('error', () => {
            title.childNodes[1].textContent = "L'audio ne peut pas être lu ! Veuillez changer de radio !";
        });
        let l = images['No_image.png']
        if(audio.img !== 'empty.png'){
            l = images[audio.img]
        }
        logo.setAttribute('src', l);
        logo.setAttribute('alt', 'logo '+audio.name);
        cat.innerHTML = "";
        for(let tag in audio.tags){
            cat.innerHTML += `<span class="tag">${audio.tags[tag]}</span>`;
        }
        but.setAttribute('src', pauseBtn);
    }

    handleAudio(){
        let but = document.querySelector('#but');
        if(this.state.radio.paused){
            console.log("play the audio");
            but.setAttribute('src', pauseBtn);
            this.state.radio.play();
        }else{
            console.log("Stop the audio");
            but.setAttribute('src', playBtn);
            this.state.radio.pause();
        }
    }

    change(){
        let tmp = this.state.radio;
        tmp.volume = parseInt(document.querySelector('#volume').value)/100;
        this.setState({radio: tmp});
        console.log(this.state.radio.volume);
    }

    render(){
        return (
            <div id="display">
                <div id="canvas">
                <h1 id="nb">{this.state.lst_rad.length} éléments trouvés</h1>
                    <ul>
                        {this.state.lst_rad.map((item, index) => (
                            <li key={index} onClick={() => this.playAudio(item)}>
                                <img src={item.img === 'empty.png' ? images['No_image.png'] : images[item.img]} alt={item.img}/>
                                <h3>{item.name}</h3>
                            </li>
                        ))}
                    </ul>
                    <div className="play" id="cat"></div>
                    <img src="" alt="" id="logo" className="play"/>
                    <h3 id="title" className="play">
                        Vous écoutez actuellement&nbsp;
                        <span></span>
                    </h3>
                    <img 
                        src="" 
                        alt="" 
                        onClick={() => this.handleAudio()} 
                        className="play" 
                        id="but"
                    />
                    <img src="https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/64/000000/external-sound-seo-xnimrodx-lineal-color-xnimrodx-2.png" className="play" id="no-sound"/>
                    <input 
                        type="range" 
                        min="0" 
                        max="100"
                        step="1"
                        className="play" 
                        id="volume" 
                        onChange={() => this.change()}
                    />
                    <img src="https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/64/000000/external-sound-seo-xnimrodx-lineal-color-xnimrodx.png" className="play" id="sound"/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <React.Fragment>
        <Player />
        <Lst />
    </React.Fragment>,
    document.getElementById('root')
);
