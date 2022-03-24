import '../css/fav.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react'

export class FavHandler extends Component {
    render(){
        return(
            <>
                <label className="switch">
                    <input type="checkbox" onClick={this.props.onClick} />
                    <span className="slider round"></span>
                    <FontAwesomeIcon icon={faStar} />
                </label>
            </>
        );
    }
}