import * as React from 'react';
import { DataTable } from 'react-native-paper';
import { Component } from 'react';
import { StopsData } from '../scripts/StopsData';

import sub_PECI from "../scripts/subscribe_PECI";

export default class LinesTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [[null,"Waiting for data"]],
      curr_line: null
    }
  }

  render() {

    var line = this.props.line

    if ( this.props.line != this.state.curr_line ){

      sub_PECI(this.props.token).then(
        res => {this.setState({tableData: filter_peci(res)});}
      )
  
      function filter_peci(value){

        var date_sent=0;

        var items = [[null,"No bus in this line"]];

        for (let i=0;i<value.data.length; i++){
          if(value.data[i].dateObserved != null){continue}

          if (value.data[i].busData.value.line == line &&  Date.parse(value.data[i].dateSent.value) > date_sent ){

            date_sent = Date.parse(value.data[i].dateSent.value);
            var dict=value.data[i].busData.value.prediction

            if (Object.keys(dict).length === 0){
              return [[null,"No prediction available"]]
            }

            items = Object.keys(dict).map(
              (key) => { 
                var stop_idx = StopsData().findIndex(x => parseInt(x.id) === parseInt(key));
                return [dict[key], StopsData()[stop_idx].name] 
              });
            
            items.sort();

          }
          
        }
        return items
      }
      
      this.setState({curr_line: this.props.line})
    }

    return (
        
            <DataTable>
            <DataTable.Header>
                <DataTable.Title style={{flex: 5}} >Nome da Paragem</DataTable.Title>
                <DataTable.Title style={{ justifyContent: 'flex-end'}}>Horas</DataTable.Title>
            </DataTable.Header>

            {this.state.tableData.map((val, index) => {
                    return (
                        <DataTable.Row>
                            <DataTable.Cell style={{flex: 5}} >{ val[1] }</DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: 'flex-end'}}>{ val[0] }</DataTable.Cell>
                        </DataTable.Row>
                        );

            })}

            </DataTable>
    );
  }
}
