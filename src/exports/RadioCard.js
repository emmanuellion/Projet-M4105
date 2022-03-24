import React, { Component } from 'react';

export class RadioCard extends Component {

    render() {
        return(
            <li onClick={() => this.props.onClick()}>
                <img src={this.props.value[0]} alt={this.props.value[1].img}/>
                <h3>{this.props.value[1].name}</h3>
            </li>
        );
    }
}