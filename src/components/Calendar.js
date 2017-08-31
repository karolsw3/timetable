import React, { Component } from 'react';
import $ from 'jquery';
import clndr from 'clndr';
import axios from 'axios';
import styled from 'styled-components';

import {Collapsible,CollapsibleItem,Button} from 'react-materialize';
import 'materialize-css';


class Calendar extends Component {
  constructor(){
    super();
    this.state = {
      events: []
    };
    this.loadCalendar = this.loadCalendar.bind(this);
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

      $('#full-clndr').height(450).clndr({
        moment: moment,
        template: $('#full-clndr-template').html(),
        events: this.state.events,
        click: function(target) {
          if(target.events.length){
    
          }
        },
        classes: {
          event: "event tooltipped"
        },
        clickEvents: {
          onMonthChange: function (month) {
            tooltipLoad(); // V
          }
        }
      });
      tooltipLoad(); // Load all tooltips (function in index.html)
    });
  }

  render(){
    return(
      <div>
        <Button floating fab='horizontal' icon='apps' className='red' large style={{bottom: '45px', right: '24px'}}>
          <Button onClick={this.loadCalendar} floating icon='insert_invitation' className='deep-purple'/>
        </Button>
        <div id="full-clndr"></div>
      </div>
    );
  }
}

export default Calendar;
