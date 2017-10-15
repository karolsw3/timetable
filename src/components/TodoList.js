import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import {Input, Collection, CollectionItem} from 'react-materialize';

class ItemInList extends Component {
  constructor(){
    super();
    this.markEventAsDone = this.markEventAsDone.bind(this);
    this.unMarkEventAsDone = this.unMarkEventAsDone.bind(this);
  }

  markEventAsDone(){
    var postData = {};
    postData["id"] = this.props.id;
    postData["date"] = this.props.date;
    var json = JSON.stringify(postData);
    axios
      .post('api/event_done.php',json)
      .then((data) => {
        this.props.toggleEvent(this.props.index);
    });
  }

  unMarkEventAsDone(){
    this.props.toggleEvent(this.props.index);
    var postData = {};
    postData["id"] = this.props.id;
    postData["date"] = this.props.date;
    var json = JSON.stringify(postData);
    axios
      .post('api/event_undone.php',json)
      .then((data) => {
        
    });   
  }

  render(){
    if(this.props.isEventDone){
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

  render(){
    return(
      <Collection>
        {this.props.thingsToDo.map((data,index)=>{
          return <ItemInList index={index} toggleEvent={this.props.toggleEvent} id={data.id} date={data.date} title={data.title} location={data.location} isEventDone={data.isEventDone} reloadCalendar={this.props.reloadCalendar} key={data.title+data.location}/>
        })}
      </Collection>
    );
  }
}

export default TodoList;
