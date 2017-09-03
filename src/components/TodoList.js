import React, { Component } from 'react';
import $ from 'jquery';
import {Input, Collection, CollectionItem} from 'react-materialize';

class ItemInList extends Component {
  constructor(){
    super();
    this.state = {
      checked: false
    }
    this.checkItem = this.checkItem.bind(this);
  }

  checkItem(){
    this.setState({
      checked: true
    });
  }

  render(){
    return(
      <CollectionItem>
        <Input type='checkbox' label={this.props.title+" ("+this.props.location+")"} />
      </CollectionItem>
    );
  }
}

class TodoList extends Component {
  constructor(){
    super();
    this.state = {
    }
  }


  render(){

    return(
      <Collection header="Groby do posprzątania">
        {this.props.thingsToDo.map((data,index)=>{
          return <ItemInList title={data.title} location={data.location}/>
        })}
      </Collection>
    );
  }
}

export default TodoList;
