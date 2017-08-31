import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Button, Icon, Navbar, NavItem, Dropdown} from 'react-materialize'

class Menu extends Component {
  constructor(){
    super();
    this.state = {
      plus: ["Dodaj klienta","Dodaj pracownika","Dodaj rozliczenie","Dodaj zmarłego"],
      plusTables:["clients","workers","settlements","deads"],
      buttons: ["Baza zmarłych","Baza klientów","Pracownicy","Rozliczenia","Lista mailingowa"],
      buttonsTables:["deads","clients","workers","settlements"]
    };

  }

  render(){
    var buttons = this.state.buttons.map((data,index) => {
        return <NavItem onClick={(e) => this.props.handleButtonClick(e,this.state.buttons[index],this.state.buttonsTables[index])} key={data}>{data}</NavItem>
    });
    var plus = this.state.plus.map((data,index) => {
        return <NavItem onClick={(e) => this.props.handlePlusClick(e,this.state.plus[index],this.state.plusTables[index])} name={data} key={data}>{data}</NavItem>
    });
    return(
      <div>
        <div className="navbar-fixed">
          <Navbar className="deep-purple" left>
            <Dropdown 
              trigger={<NavItem>Dodaj do bazy<Icon large right>arrow_drop_down</Icon></NavItem>}
              options={{ hover: true, belowOrigin: true }}
              >
              {plus}
            </Dropdown>
              {buttons}
          </Navbar>
        </div>
      </div>
    );
  }
}

export default Menu;
