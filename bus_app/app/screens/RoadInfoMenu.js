import React, { Component } from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';

export default class RoadInfoMenu extends Component {

    constructor(props) {
      super(props);
      this.state = {}
    }

    
    render() {

      road_id = this.props.road_id;
      roadsInfo = this.props.dict;

      var street_name = "NaN";
      var speed_med = -3;
      var numberVehicles = -3;

      for (const [key, value] of Object.entries(roadsInfo)) {
        if(value.id==road_id){
          street_name = value.name;
          numberVehicles = value.vehicleCount;

          if(value.vehicleCount == 0){//! rua sem veiculos
            speed_med = "Sem Transito!";
          }else{
            speed_med = Math.round(value.speed) + " Km/h";
          }


        }
      }

      return (  
        <View>
            <List.Item
                title={street_name}
                left={props => <List.Icon {...props} icon="road-variant" />}
            />
            <List.Item
                title={"Velocidade Média: " + speed_med}
                left={props => <List.Icon {...props} icon="speedometer" />}
            />
            <List.Item
                title={"Numero de Veiculos: " + numberVehicles}
                left={props => <List.Icon {...props} icon="car" />}
            />         
        </View>  
      );
    }
  }