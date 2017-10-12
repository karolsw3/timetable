import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import {Input, Collection, CollectionItem} from 'react-materialize';

class ItemInList extends Component {
  constructor(){
    super();
    this.state = {
      checked: false,
      unChecked: false
    }
    this.checkItem = this.checkItem.bind(this);
    this.markEventAsDone = this.markEventAsDone.bind(this);

    this.unCheckItem = this.unCheckItem.bind(this); // un
    this.unMarkEventAsDone = this.unMarkEventAsDone.bind(this);
  }

  checkItem(){
    this.setState({
      checked: true,
      unChecked: false
    });
    this.props.reloadCalendar();
  }

  unCheckItem(){
    this.setState({
      checked: false,
      unChecked: true
    });
    this.props.reloadCalendar();
  }

  markEventAsDone(){
    var postData = {};
    postData["id"] = this.props.id;
    postData["date"] = this.props.date;
    var json = JSON.stringify(postData);
    axios
      .post('api/event_done.php',json)
      .then((data) => {
        this.checkItem();
        this.forceUpdate();
    });
  }

  unMarkEventAsDone(){
    var postData = {};
    postData["id"] = this.props.id;
    postData["date"] = this.props.date;
    var json = JSON.stringify(postData);
    axios
      .post('api/event_undone.php',json)
      .then((data) => {
        this.unCheckItem();
        this.forceUpdate();
    });   
  }

  render(){
    if((this.props.isEventDone || this.state.checked) && !this.state.unchecked){
      return(
        <CollectionItem onClick={this.unMarkEventAsDone}>
          <Input type='checkbox' label={"Wykonano! "+this.props.title+" ("+this.props.location+")"} checked/>
        </CollectionItem>
      );
    }else{
      return(
        <CollectionItem onClick={this.markEventAsDone}>
          <input type='checkbox' id={this.props.date} />
          <label for={this.props.date}>{this.props.title+" ("+this.props.location+")"}</label>
        </CollectionItem>
      );
    }
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
      <Collection>
        {this.props.thingsToDo.map((data,index)=>{
          return <ItemInList id={data.id} date={data.date} title={data.title} location={data.location} isEventDone={data.isEventDone} reloadCalendar={this.props.reloadCalendar}/>
        })}
      </Collection>
    );
  }
}

export default TodoList;
