import React, { Component } from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';

import { StopsData } from '../scripts/StopsData';

import sub_PECI from "../scripts/subscribe_PECI";

export default class BusInfoMenu extends Component {

    constructor(props) {
      super(props);
      this.state = {
        id:1,
        linha:"NaN",
        speed:0.0,
        eta:"NaN",
        next_stop:"NaN",
      };
    }

    
    render() {

      newID = this.props.newID;
      buses = this.props.buses;

      index = buses.findIndex(x => x.id === newID);

      setTimeout(() => {

            sub_PECI(this.props.token).then(
                res => {this.setState(filter_peci(res));}
            )

            function filter_peci(value){
                const d = new Date();

                var item = {
                  linha:"Nan",
                  eta:"Nan",
                  next_stop:"Nan"
                };
              
                for (let i=0;i<value.data.length; i++){ 
                    if (value.data[i].busData.value.bus_id == newID){

                      var now=Date.now()
                      var min=999999999
                      var tmp_obj={
                          stop: "Nan",
                          eta: 0
                      }

                      Object.entries(value.data[i].busData.value.prediction).forEach(([key, value2]) => {
                          var arr_stop= value2.split(":");
                          
                          var date_str= d.getMonth()+1+"/"+d.getDate()+"/"+d.getFullYear()
                          var tmp=Date.parse(date_str)
                          var timeOfStop= tmp+(parseInt(arr_stop[0])*3600+parseInt(arr_stop[1])*60+parseInt(arr_stop[2]))*1000
                          
                          var tmp=timeOfStop-now
                          if (tmp>0 && tmp<min){
                              min=tmp
                              tmp_obj.stop=key
                              tmp_obj.eta=Math.round(tmp/1000/60)
                          }

                      })

                      //console.log(value.data[i].busData.value.line);

                      var stop_idx = StopsData().findIndex(x => parseInt(x.id) === parseInt(tmp_obj.stop));
                        
                      item = {
                        linha: value.data[i].busData.value.line,
                        eta: tmp_obj.eta,
                        next_stop: StopsData()[stop_idx].name
                      };
                    
                      
                    }
                }

                return item;
            }
      }, 1000);

      if( index==-1 ){ //! fix de bug - crash quando o bus desaparece
        return ( <View/> );
      }

      return (  
        <View>
            <List.Item
                title={"Linha: " + this.state.linha}
                left={props => <List.Icon {...props} icon="bus" />}
            />
            <List.Item
                title={"Velocidade: " + buses[index].speed + " Km/h"}
                left={props => <List.Icon {...props} icon="speedometer" />}
            />
            <List.Item
                title={"ETA: " + this.state.eta + " min"}
                left={props => <List.Icon {...props} icon="clock" />}
            />
            <List.Item
                title={"Prox par: " + this.state.next_stop}
                left={props => <List.Icon {...props} icon="bus-stop" />}
            />
            
        </View>  
      );
    }
  }