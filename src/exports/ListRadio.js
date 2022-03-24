import React, { Component } from 'react';
import { RadioCard } from './RadioCard.js';

export class ListRadio extends Component {

    render() {
        return (
            <ul id="carre">
                {this.props.value.rad.map((item, index) => (
                    <RadioCard
                        key = {index}
                        onClick = {() => this.props.value.dis.playAudio(item)}
                        value = {[item.img === 'empty.png' ? this.props.value.img['No_image.png'] : this.props.value.img[item.img], item]}
                    />
                ))}
        </ul>
        );
    }
}