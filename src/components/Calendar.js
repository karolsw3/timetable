import React, { Component } from 'react';
import $ from 'jquery';
import clndr from 'clndr';
import axios from 'axios';
import styled from 'styled-components';

import TodoList from './TodoList';

import {Collapsible,CollapsibleItem,Button,Modal} from 'react-materialize';


class Calendar extends Component {
  constructor(){
    super();
    this.state = {
      events: [],
      todoEvents: []
    };
    this.loadCalendar = this.loadCalendar.bind(this);
    this.destroyCalendar = this.destroyCalendar.bind(this);
  }
  
  componentDidMount(){

  }

  componentWillReceiveProps(next) {

  }

  loadCalendar(){
    axios
    .post('api/return_events.php')
    .then((data) => {
      this.setState({ events: data.data });

      $('#full-clndr').height(450).show().clndr({
        moment: moment,
        template: $('#full-clndr-template').html(),
        events: this.state.events,
        classes: {
          event: "event tooltipped"
        },
        clickEvents: {
          onMonthChange: function (month) {
            tooltipLoad(); // V
          },
          click: function (target) {
            this.setState({
              todoEvents: target.events
            });       
            if(target.events.length){
              todolistOpen(); // Load todolist modal (function in index.html) 
            }
          }.bind(this)
        }
      });
      tooltipLoad(); // Load all tooltips (function in index.html)
    });
  }

destroyCalendar(){
  $('#full-clndr').hide();
}
  render(){
    var todoRender = "";
    if(this.state.todoEvents !== null){
      todoRender = <TodoList thingsToDo={this.state.todoEvents} reloadCalendar={this.loadCalendar}/>;
    }
    return(
      <div>
        <Button floating fab='horizontal' icon='apps' className='red' large style={{bottom: '45px', right: '24px'}}>
          <Button onClick={this.loadCalendar} floating icon='insert_invitation' className='deep-purple'/>
          <Button onClick={this.destroyCalendar} floating icon='close' className='red'/>
        </Button>
        <Modal
          id='todo'
          header='Groby do posprzątania'>
          {todoRender}
        </Modal>
        <div id="full-clndr"></div>
      </div>
    );
  }
}

export default Calendar;
