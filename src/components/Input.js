import React, { Component } from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import {Input, Row, CardPanel} from 'react-materialize';

const RelativeDiv = styled.div`
  position: relative;
`

class Input2 extends Component {
  constructor(){
    super();
    this.state = {
      errorDisplay: "none",
      errorMessage: "",
      value: "",
      dropdownValue: "",
      numberOfDateInputs: 1,
      editDates: [],
      editDataLoaded: false
    }
    this.changeHandle = this.changeHandle.bind(this);
    this.validate = this.validate.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.multiCalendarInputExpander = this.multiCalendarInputExpander.bind(this);
    this.editMultiCalendar = this.editMultiCalendar.bind(this);
  }

  changeHandle(){
    this.forceUpdate();
    this.validate();
  }

  validateEmail(email) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  validatePhone(phone){
    var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/;
    return regex.test(phone);
  }

  validate(){
    var value = $("#"+this.props.name).val();
    if(value.length < 1 && !this.props.validators.canBeEmpty){
      this.setState({
        errorMessage: "To pole nie może być puste!",
        errorDisplay: "block"
      });
    }else if(value.length < this.props.validators.minChars){
      this.setState({
        errorMessage: "Minimalna ilość znaków wynosi "+this.props.validators.minChars+"!",
        errorDisplay: "block"
      });
    }else if(value.length > this.props.validators.maxChars){
      this.setState({
        errorMessage: "Przekroczono maksymalną ilość znaków!",
        errorDisplay: "block"
      });
    }else if(this.props.validators.type === "email" && !this.validateEmail(value)){
      this.setState({
        errorMessage: "To nie jest prawidłowy email!",
        errorDisplay: "block"
      }); 
    }else if(this.props.validators.type === "phone" && !this.validatePhone(value)){
      this.setState({
        errorMessage: "To nie jest prawidłowy numer telefonu!",
        errorDisplay: "block"
      }); 
    }else{
      this.setState({
        errorMessage: "",
        errorDisplay: "none"
      });      
    }
    if(value.length < 1 && this.props.validators.canBeEmpty){ // Gdy pole jest puste i ma do tego prawo
      this.setState({
        errorMessage: "",
        errorDisplay: "none"
      });
    }
  }

  componentWillReceiveProps(next) {
    if(next.value){
      $("label").addClass("active");
    }
    this.setState({value: next.value, dropdownValue: next.dropdownValue});
    this.editMultiCalendar(next);
    this.forceUpdate();
  }

  editMultiCalendar(next){
    if(next.value !== "" && next.type === "multiCalendar"){ // Enable multivalue editing
      $("#"+this.props.name).val(next.value);
      var dates = next.value.split(";");
      this.setState({
        value: this.props.value,
        numberOfDateInputs: dates.length,
        editDates: dates
      });
      this.forceUpdate();
    }
  }

  handleValueChange(event) {
    this.setState({value: event.target.value});
  }

  multiCalendarInputExpander(event){
    //check if it's needed to generate another input if the last input is full
    if($("#dateInput_"+(this.state.numberOfDateInputs-1)).val() !== ""){
      console.log("Input nr."+(this.state.numberOfDateInputs-1)+" is so full look: "+$("#dateInput_"+(this.state.numberOfDateInputs-1)).val());
      this.setState({
          value: event.target.value,
          numberOfDateInputs: this.state.numberOfDateInputs+1
      });
    }

    var masterInputValue = "";

    for(var i=0;i<this.state.numberOfDateInputs-1;i++){
      masterInputValue += $("#dateInput_"+i).val()+";";
    }

    $("#"+this.props.name).val(masterInputValue);
    this.forceUpdate();
  }

  componentDidUpdate(){
    if(this.state.editDates.length > 0 && !this.state.editDataLoaded){
      for(var i=0;i<this.state.editDates.length;i++){
        $("#dateInput_"+i).val(this.state.editDates[i]);
      }
      $("label").addClass("active");
      this.setState({
        editDataLoaded: true
      });
    }
  }

  render(){

    if(this.props.type === "dropdownSelect"){
        $('#'+this.props.name).val(this.state.value);
        var selectedOptionIndex = $('#'+this.props.name).prop('selectedIndex');// <--
        if(selectedOptionIndex === undefined){
          selectedOptionIndex = 0;
        }
      return(
        <div>
          <Input value={this.state.value} s={12} m={6} type='select' label={this.props.name} name={this.props.name} id={this.props.name} onChange={this.changeHandle} onChange={this.handleValueChange}>
            {this.props.options.map((option,i)=>{
              return <option value={option} data-icon={this.props.optionsImages[i]} className="left circle">{option}</option>
            })}
          </Input>
          <Input value={this.state.dropdownValue} s={12} m={6} type='select' label={this.props.name} name={this.props.dropdownName} id={this.props.dropdownName}>
            {this.props.dropdown[selectedOptionIndex].map((option)=>{
              return <option value={option}>{option}</option>
            })}
          </Input>
        </div>
      );
    }

    else if(this.props.type === "select"){
      return(
        <Input value={this.state.value} s={12} m={6} type='select' label={this.props.name} name={this.props.name} id={this.props.name} onChange={this.handleValueChange}>
          {this.props.options.map((option,i)=>{
            return <option value={option} data-icon={this.props.optionsImages[i]} className="left circle">{option}</option>
          })}
        </Input>
      );          
    }

    else if(this.props.type === "date"){
      return(
          <Input value={this.state.value} s={12} id={this.props.name} name={this.props.name} type='date' options={{selectYears: 60,max: new Date(2025,1,1)}} label={this.props.placeholder} onChange={this.handleValueChange}/>      
      );
    }

    else if(this.props.type === "multiCalendar"){  
      var inputs = [];

      for(var i=0;i<this.state.numberOfDateInputs;i++){
        inputs.push(<Input s={12} id={"dateInput_"+i} type='date' options={{selectYears: 2,max: new Date(2025,1,1)}} label={"Data nr."+(i+1)} onChange={this.multiCalendarInputExpander}/>);
      }

      return(
        <div className="col input-field s12">
          <h5>{this.props.placeholder}</h5>
          <Input id={this.props.name} name={this.props.name} hidden/>
          {inputs}
        </div>
      );

    }

    else if(this.props.type === "image"){
      return(
        <Row>
          <div className="file-field input-field col s12">
            <div className="btn">
              <span>Dodaj zdjęcie nagrobka</span>
              <input type="file" id="image" name={this.props.name}/>
            </div>
            <div className="file-path-wrapper">
              <input value={this.state.value} className="file-path validate" type="text" onChange={this.handleValueChange}/>
            </div>
          </div> 
        </Row>
      );     
    }

    else{
      return( 
        <li>
          <RelativeDiv>
            <Input value={this.state.value} s={12} m={6} id={this.props.name} name={this.props.name} label={this.props.placeholder} onChange={this.changeHandle} error={this.state.errorMessage} onChange={this.handleValueChange} validate/>
          </RelativeDiv>
        </li>
      );
    }
  }

}

export default Input2;
