import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import styled from 'styled-components';

const Img = styled.img`
  width: 100%;
  padding: 0;
  margin: 0;
`

class Info extends Component {
  constructor(){
    super();
    this.state = {
      "info":[],
      "translate":[]
    };
    this.updateInfo = this.updateInfo.bind(this);
  }

  updateInfo(){
    var table = this.props.table;
    var ID = this.props.ID;

    var postData = {};
    postData["table"] = table;
    postData["ID"] = ID;
    var json = JSON.stringify(postData);
    axios
      .get('json/'+table+'.json')
      .then((data) => {
        this.setState({ translate: data.data.translate });
      });
    axios
      .post('api/get_info.php',json)
      .then((data) => {
        this.setState({ info: data.data });
      });
  }

  componentDidMount(){
    this.updateInfo();
  }

  componentWillReceiveProps(next) {
    this.updateInfo();
  }

  render(){

    var info = [];
    var arrayLength = this.state.info["count"];

    for(var i=0;i<arrayLength;i++){
      info.push(this.state.info[i]);
    } 

    return(
      <div>
        {info.map((data,i) =>{
            switch(Object.keys(this.state.info)[i+info.length]){
              case "image":
                return <Img src={"api/upload/"+data} width="450" alt="Brak zdjęcia nagrobka."/>
                break;
              default:
                return <p>{this.state.translate[Object.keys(this.state.info)[i+info.length]]+": "+data}</p>
            }
        })}
      </div>
    );
  }
}

export default Info;
