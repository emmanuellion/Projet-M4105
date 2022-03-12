import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import logo from  './logo512.png';

function Entry(props){
  return (
    <div style={{
      display: "flex",
      position: "absolute",
      width: "60%",
      top: "20%",
      left: "20%",
    }}>
      <input type="text" placeholder="tâche à ajouter" id={props.value} />
      <button onClick={props.onClick}>Ajouter la tâche</button>
    </div>
  );
}

class Task extends React.Component {
  constructor(){
    super();
    let lst;
    if(localStorage.getItem('task') != null){
      lst = JSON.parse(localStorage.getItem('task'))['tabe'];
    }
    this.state = {
      id: 'inp',
      task: lst ? lst : []
    }
  }

  addElement(){
    let tab = this.state.task;
    let i = document.querySelector('#'+this.state.id);
    tab.push(i.value);
    i.value = "";
    this.setState({task: tab});
    localStorage.setItem('task', JSON.stringify(
      {
        "tabe": tab
      }));
  }

  removeElement(index){
    let tab = this.state.task;
    tab.splice(index, 1);
    this.setState({task: tab});
    localStorage.setItem('task', JSON.stringify(
      {
        "tabe": tab
      }));
  }

  render(){
    let lst = [];
    for(let item in this.state.task){
      lst.push(this.state.task[item]);
    }
    console.log(lst);
    return lst.length !== 0 ? (
      <React.Fragment>
        <Entry value={this.state.id} onClick={() => this.addElement()} />
        <ul>
          {lst.map((item, index) => (
            <div key={index}>
              <li>{item}</li>
              <button onClick={() => this.removeElement(index)}>Supprimer</button>
            </div>
          ))}
        </ul>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Entry value={this.state.id} onClick={() => this.addElement()} />
        <ul></ul>
      </React.Fragment>
    );
  }
///////////////
// const plantList = [
//   'monstera',
//   'ficus lyrata',
//   'pothos argenté',
//   'yucca',
//   'palmier'
// ]

// function Component(){
//   return (
//       <ul>
//           {plantList.map((plant, index) => (
//               <li key={`${plant}-${index}`}>{ plant }</li>
//           ))}
//       </ul>
//   )
// }
///////////////
}


ReactDOM.render(
  <Task />,
  document.getElementById('root')
);
