import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import styled from 'styled-components';

import Info from './Info';
import {Table, Modal, Button, Input, Row} from 'react-materialize';

const TableStyle = styled.table`
  marin: 0 auto;
  border-collapse: collapse;
  width: 100%;
  cursor: default;

  th, td {
      text-align: left;
      padding: 13px;
  }

  tr:nth-child(even){background-color: #f2f2f2}

  th {
      background-color: #673ab7;
      color: white;
  }  
`

class Table2 extends Component {
  constructor(){
    super();
    this.state = {
        "table": "",
        "message":"",
        "translate":[],
        "data": [],
        "rows": [],
        "searchFilter": ""
    };
    this.updateTable = this.updateTable.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.search = this.search.bind(this);
  }
  updateTable(table){
    this.setState({ "data": [], "rows": [] });
    var postData = {};
    postData["table"] = table;
    axios
      .get('json/'+table+'.json')
      .then((data) => {
        this.setState({ translate: data.data.translate });
        postData["rows"] = data.data.quickView; // Szybki podgląd tabeli || Quick view of the table
        var json = JSON.stringify(postData);
      axios
        .post('api/get_tables.php',json)
        .then((data) => {
          this.setState({ data: data.data.data, rows: data.data.rows, table: postData["table"] });
      });
    });
  }

  deleteRecord(table,id){ // Usuwa rekord z bazy || Deletes record from the database

    var postData = {};
    postData["table"] = table;
    postData["id"] = id;
    var json = JSON.stringify(postData);

    axios
      .post('api/delete_records.php',json)
      .then((data) => {
        this.setState({ message: data.data });
    });    
  }

  componentDidMount(){
    this.updateTable(this.props.table);
  }

  componentWillReceiveProps(next) {
    this.updateTable(next.table);
  }

  search(event){
    this.setState({
      searchFilter: event.target.value
    });
  }

  render(){
    var rows = this.state.rows.map((data,index)=> {
      if(index === 0){// ID
        return <th><Button floating className='deep-purple' waves='light'>{this.state.translate[data.name]}</Button></th>
      }else if(data.type === "multiDateNearest"){
        return <th>Najbliższy termin</th>
      }else{
        return <th>{this.state.translate[data.name]}</th>
      }
    });
    
    var searchData = "";

    var data = this.state.data.map((data,i)=>{
      searchData += ""+data;
      return data;
    });
    
    var x = 0;

    var cluster = data.map((d,i)=>{

      var searchedFound = false;
      for(var i2=0;i2<rows.length;i2++){
        try{
          if(data[i2+i].search(this.state.searchFilter) !== -1){
            searchedFound = true;
          }
        }catch(err){}
      }
        
      if(x%rows.length === 0 && searchedFound){          
        x++;
        var rowsCluster = rows.map((d,index)=>{
          if(index === 0){// ID
            return <td><Button floating className='deep-purple' waves='light'>{data[i+index]}</Button></td>
          }else if(this.state.rows[index].type === "multiDateNearest"){
            var dates = data[i+index].split(";");
            var nearest = "";
            for(var i2=0;i2<dates.length;i2++){

              var day = dates[i2].substring(0, 2);
              var month = dates[i2].substring(3, 5);
              var year = dates[i2].substring(6, 10);
              
              var formatted_date = month+"/"+day+"/"+year;

              if(Date.parse(formatted_date) > Date.parse(new Date().toString('MM/dd/yyyy'))){
                nearest = formatted_date;
                break;
              }
            }
            var nearestDateExists = false;
            var today = new Date();
            for(var i2=0;i2<dates.length;i2++){

              var day = dates[i2].substring(0, 2);
              var month = dates[i2].substring(3, 5);
              var year = dates[i2].substring(6, 10);
              
              var formatted_date = month+"/"+day+"/"+year;

              var nearestDate = Date.parse(nearest);
              var dateToCompare = Date.parse(formatted_date);
              if(dateToCompare <= nearestDate && dateToCompare > Date.parse(new Date().toString('MM/dd/yyyy'))){ // Najbliższy termin jest w przyszłosci || Nearest date is in the future, not past! 
                nearest = formatted_date;
                nearestDateExists = true;
              }
            }
            if(!nearestDateExists){
              nearest = "-";
            }

            var month = nearest.substring(0, 2);
            var day = nearest.substring(3, 5);
            var year = nearest.substring(6, 10);

            nearest = day+"-"+month+"-"+year;

            return <td><b>{nearest}</b></td>
          }else{
            return <td>{data[i+index]}</td>
          }
        });
        var ID = data[i]; // Główny indetyfikator wszystkich wpisów w tabeli - po ID jest wszystko wyszukiwane || Main indetificator of the table records - Everything is searched via ID
        return(
            <tr>
              {rowsCluster}
              <td>
                <Modal
                  header='Informacje'
                  actions=''
                  trigger={
                    <Button waves='light'>Pokaż</Button>
                  }>
                  <Info ID={ID} table={this.state.table}></Info>
                </Modal>
              </td>
              <td>
                <Button floating className='blue' waves='light' icon='edit' onClick={(e) => {this.props.handleEditClick(e,this.state.table,ID)}}/>
              </td>
              <td>
                <Modal
                  actions=''
                  header='Czy na pewno chcesz usunąć rekord z tabeli?'
                  bottomSheet
                  trigger={<Button floating className='red' waves='light' icon='delete'/>}>
                  <Button waves='light' onClick={()=>{this.deleteRecord(this.state.table,ID); this.updateTable(this.state.table); $(this).parent().parent().modal('close');}}>Tak</Button>
                </Modal>
              </td>
            </tr>
        );
      }else{
        x++;
        return null;
      }
      
    });

    return(
      <div>
        <Row>
          <Input placeholder="Przeszukaj tabelę" s={12} onChange={this.search}/>
        </Row>
        <Table responsive={true} hoverable={true} stripped={true}>
            <thead>
              <tr>
                {rows}
                <th>Informacje</th>
                <th>Edytuj</th>
                <th>Usuń</th>
              </tr>
            </thead>
            <tbody>
              {cluster}
            </tbody>
        </Table>
      </div>
    );

  }
}

export default Table2;
