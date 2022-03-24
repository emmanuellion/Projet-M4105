import React, { Component } from 'react';

export class TagBtn extends Component {
    render(){
        return(
            <li 
                data-tag={this.props.value} 
                id={this.props.value} 
                onClick={this.props.onClick}
                className="li-tag"
            >{this.props.value}</li>
        );
    }
}