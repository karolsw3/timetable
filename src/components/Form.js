import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';

import Input2 from './Input';
import {Row,Button} from 'react-materialize';

export default class Form extends React.Component {
	
	constructor(){
		super();
		this.state = {
      inputs: [],
      info:[]
		}
    this.changeHandle = this.changeHandle.bind(this);
    this.submit = this.submit.bind(this);
	}
	componentDidMount(){
    this.updateInputs(this.props.openedTable);
  }
  componentWillReceiveProps(next) {
    this.updateInputs(next.openedTable);
  }

  updateInputs(table){
    this.setState({ inputs: [] });
    axios
    .get('json/'+table+'.json')
    .then((data) => {
      this.setState({ inputs: data.data.data });
    });

    if(this.props.editedID){
      var postData = {};
      postData["ID"] = this.props.editedID;
      postData["table"] = table;
      var json = JSON.stringify(postData);

      axios
        .post('api/get_info.php',json)
        .then((data) => {
          this.setState({ info: data.data });
        });
    }
  }

  changeHandle(){
    this.forceUpdate();
  }
  
  submit(){
    var postData = {};

    postData["table"] = this.props.openedTable;
    var inputs = this.state.inputs.map((data,i)=>{
      var value = $("#"+data.name).val();
      if(data.name !== "image"){
        postData[data.name] = value;
      }
      if(data.dropdownName !== null){
        postData[data.dropdownName] = $("#"+data.dropdownName).val();
      }
    });
    // Send images (if found) to server
    if(document.getElementById("image") !== null){
      if(document.getElementById("image").files[0] !== undefined){
        var photo = document.getElementById("image");  
        var file = photo.files[0];
        let data = new FormData();
        data.append("fileToUpload", file);

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        axios.post('api/upload.php', data, config); 
        postData["image"] = photo.files[0].name; // Get normal image name instead of C://fakepath
      }
    }
    //

    var json = JSON.stringify(postData);

    if(this.props.editedID){ // Edit
      postData["id"] = this.props.editedID;
      json = JSON.stringify(postData);
      axios
      .post('api/edit.php',json)
      .then((data) => { this.props.handleSubmit(data.data.type,data.data.message) });
    }else{ // Submit 
      axios
      .post('api/form_submit.php',json)
      .then((data) => { this.props.handleSubmit(data.data.type,data.data.message) });
    }

  }

	render(){ 
		var inputs = this.state.inputs.map((data,i)=>{
        var validators = {
          "type": data.type,
          "canBeEmpty": data.canBeEmpty,
          "maxChars": data.maxChars,
          "minChars": data.minChars
        };
        return <Input2 value={this.state.info[data.name]} dropdownValue={this.state.info[data.dropdownName]} validators={validators} type={data.type} id={data.name} name={data.name} dropdown={data.dropdown} dropdownName={data.dropdownName} placeholder={data.placeholder} options={data.options} optionsImages={data.optionsImages} key={i}/>
    });
    
    if(this.props.editedID){
      return (
        <div className="container">
          <div className="form__content">
            <ul><Row>{inputs}</Row></ul>
          </div>
          <div className="form__submit">
            <Button waves='light' onClick={this.submit}>Zapisz</Button>
          </div>
        </div>
      );      
    }else{
      return (
        <div className="container">
          <div className="form__content">
            <ul><Row>{inputs}</Row></ul>
          </div>
          <div className="form__submit">
            <Button waves='light' onClick={this.submit}>Dodaj</Button>
          </div>
        </div>
      );
    }

	}
	
}
