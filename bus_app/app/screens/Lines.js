import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, View, Dimensions,ScrollView,Text} from 'react-native';

// import do card da linha (para aparecer o mapa)
import LineCard from "./LineCard"
import LinesTable from "./LinesTable"

// dropdown para selecionar linha
import SelectDropdown from 'react-native-select-dropdown'

import { LinesData } from '../scripts/LinesData';
import { StopsData } from '../scripts/StopsData';
import { generate_token } from '../scripts/token_generate';
import sub from "../scripts/subscribe_orion"
import sub_PECI from "../scripts/subscribe_PECI";


export default class Lines extends Component {

    constructor(props) {
        super(props);

        this.state = {
            buses:[
                {
                    id:1, // bus id 
                    lat:40.633305,
                    lon:-8.659190,
                    linha: [3],
                    next_stops_arr: []
                },
                {
                    id:52,
                    lat:40.636296,
                    lon:-8.654267,
                    linha: [8],
                    next_stops_arr: []
                }
            ],

            stops: StopsData(),

            token: null,
            // visible variable for menu
            Linha_selected: 1
        }
    }
    
    render(){

        if ( this.state.token==null ){
            generate_token().then(
                value => this.setState( {token:value} )
            );
        }

        setTimeout(() => {
            sub(this.state.token).then(
                res => this.setState( {buses:filter_orion(res)} )
                );

                function filter_orion(value) {
                    var data=[];

                    for (let i=0;i<value.data.length; i++){
                        var obj={
                            id:value.data[i].stationID.value,
                            lat:value.data[i].location.value.coordinates[1],
                            lon:value.data[i].location.value.coordinates[0],
                            speed:value.data[i].speed.value,
                            linha: [0],
                            eta: 0,
                            next_stop: "NaN"
                        }
                    
                        var timeOfData= Date.parse(value.data[i].dateObserved.value)
                        var now=Date.now()

                        var timeToDeleteBus = 5*1000; //! 60 sec para deletar bus

                        if ( timeOfData > (now- timeToDeleteBus) ){
                            data.push(obj);
                        }

                    }
                return data;
            }
                        
        }, 1000)

        const linhas = ["1", "2/9", "3", "4", "5/7", "6","8", "10", "11", "12", "13"]

        const line_selected = this.state.Linha_selected
        var line_buses = this.state.buses.filter(function(bus) {
            
            return bus.linha.includes(line_selected)
        
        });

        return(
            <View>
                <View style={styles.dropdown}>
                    <SelectDropdown
                            data={linhas}
                            defaultButtonText={"Escolha a linha"}
                            onSelect={(selectedItem, index) => {

                                if (selectedItem === "2/9"){
                                    this.setState( {Linha_selected:2} )
                                }else if (selectedItem === "5/7"){
                                    this.setState( {Linha_selected:5} )
                                }else{
                                    this.setState( {Linha_selected:parseInt(selectedItem)} )
                                }
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem
                            }}
                    />
                </View>
                <ScrollView>
                    <LineCard buses={line_buses} lineStops = {LinesData(this.state.Linha_selected)} line = {this.state.Linha_selected} /> 
                    <Text style={{  fontSize: 20, 
                                    fontWeight: 'bold', 
                                    marginTop: 10,
                                    textAlign: 'center',  
                                }}> Horario previsto do autocarro </Text>
                    <LinesTable line={this.state.Linha_selected} token={this.state.token}/>
                </ScrollView>  
                
            </View>
        );
        
    }
}

const styles = StyleSheet.create({
    dropdown: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });
