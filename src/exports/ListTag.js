import React, { Component } from 'react';
import { Remove } from './base.js';
import { TagBtn } from './TagBtn.js';

export class ListTag extends Component {
    constructor(props){
        super(props);
        this.state = {
            lst_orig: {},
            lst_cat: []
        };
        this.init();
    }

    init(){
        this.state.lst_cat.push('All');
        this.state.lst_cat.push('None');
        this.state.lst_cat.push('Random');
        this.props.value.map['All'] = 0;
        this.props.value.map['None'] = 0;
        this.props.value.map['Random'] = 0;
        for(let item of this.props.value.radios.list){
            for(let cat of item.tags){
                if(!this.state.lst_cat.includes(cat)){
                    this.state.lst_cat.push(cat);
                    this.props.value.map[cat] = 0;
                }
            }
        }
    }

    handleConstraint(li){
        let tag = li.dataset.tag;
        if(this.props.value.rand){
            this.props.value.constraints = [];
        }
        this.props.value.rand = false;
        if(tag === 'All'){
            document.querySelectorAll('.li-tag').forEach(el => {
                if(el.dataset.tag !== 'None'){
                    el.classList.add('active');
                    this.props.value.constraints.push(el.dataset.tag);
                    this.props.value.map[el.dataset.tag]++;
                }
            });
        }else if(tag === 'None'){
            document.querySelectorAll('.li-tag').forEach(el => {
                el.classList.remove('active');
                this.props.value.constraints = Remove(this.props.value.constraints, el.dataset.tag);
                this.props.value.map[el.dataset.tag]++;
            });
        }else if(tag === 'Random'){
            document.querySelectorAll('.li-tag').forEach(el => {
                el.classList.remove('active');
                this.props.value.constraints = Remove(this.props.value.constraints, el.dataset.tag);
                this.props.value.map[el.dataset.tag]++;
            });
            this.props.value.constraints = [];
            do{
                let random = Math.floor(Math.random() * this.state.lst_cat.length);
                tag = this.state.lst_cat[random];
            }while(tag === 'None' || tag === 'All' || tag === 'Random');
            document.querySelectorAll('.li-tag').forEach(el => {
                if(el.dataset.tag === tag){
                    el.classList.add('active');
                }
            });
            this.props.value.constraints.push(tag);
            this.props.value.map[tag]++;
            this.props.value.rand = true;
        }else{
            if(this.props.value.map[tag] % 2 === 0){
                li.classList.add('active');
                this.props.value.constraints.push(tag);   
                this.props.value.map[tag]++;
            }else{
                li.classList.remove('active');
                this.props.value.constraints = Remove(this.props.value.constraints, tag);
                this.props.value.map[tag]++;
            }
        }
        this.props.contraint(this.props.value.dis);
    }

    render(){
        return (
            <div id="lst_rad">
                <ul>
                    {this.state.lst_cat.map((item, index) => (
                        <TagBtn 
                            value={item} 
                            onClick={() => this.handleConstraint(document.querySelector("[data-tag=\""+item+"\"]"))} 
                            key={index} 
                        />
                    ))}
                </ul>
            </div>
        );
    }
}