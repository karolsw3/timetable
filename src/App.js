import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Menu from './components/Menu'
import Calendar from './components/Calendar'
import Form from './components/Form'
import Table2 from './components/Table'

import {Button,NavItem,Navbar, Icon, Row, Col} from 'react-materialize';

const WindowStyle = styled.div`
  color: ${props => props.color};
`

class App extends Component {
  constructor(){
    super();
    this.state = {
      "openedWindow" : "",
      "openedWindow__isVisible" : false,
      "openedWindow__type" : "",
      "openedWindow__data" : [],
      "openedTable" : "",
      "editedID":""
    }
    this.showForm = this.showForm.bind(this);
    this.showTable = this.showTable.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.editTable = this.editTable.bind(this);
  }

  closeWindow(){
    this.setState({
      "openedWindow__isVisible": false
    });
  }
  showForm(e,openedWindow,openedTable){
    this.setState({
      "openedWindow__isVisible": true,
      "openedWindow__type" : "form",
      "openedTable" : openedTable,
      "openedWindow" : openedWindow
    });
  }

  showTable(e,openedWindow,openedTable){
    this.setState({
      "openedWindow__isVisible": true,
      "openedWindow__type" : "table",
      "openedTable" : openedTable,
      "openedWindow" : openedWindow,
      "editedID":""
    });    
  }

  showAlert(type,message){
    this.setState({
      "openedWindow__isVisible": true,
      "openedWindow__type" : "alert",
      "openedWindow__data" : {
        "type" : type,
        "message" : message
      }
    });
  }

  editTable(e,openedTable,id){
    this.setState({
      "openedWindow__isVisible": true,
      "openedWindow__type" : "form",
      "openedTable" : openedTable,
      "editedID": id
    });    
  }

  render() {
    let renderWindow = "";
    let window = "";
    const color = "#26a69a";

    if(this.state.openedWindow__isVisible){
      if(this.state.openedWindow__type === "form"){
        renderWindow = <Form name={this.state.openedWindow} openedTable={this.state.openedTable} handleClose={this.closeWindow} handleSubmit={this.showAlert} editedID={this.state.editedID}/>
      }
      else if(this.state.openedWindow__type === "alert"){
        renderWindow = this.state.openedWindow__data.message;
      }
      else if(this.state.openedWindow__type === "table"){
        renderWindow = <Table2 table={this.state.openedTable} handleClose={this.closeWindow} handleEditClick={this.editTable}/>
      } // onClick={() => this.closeWindow()}
      window = <WindowStyle color={color}>{renderWindow}</WindowStyle>
    }
    
    return( 
      <div className="App">
        <Menu handlePlusClick={this.showForm} handleButtonClick={this.showTable}/>
        <Calendar/>
        {window}
      </div>
    );
  }
}

export default App;
