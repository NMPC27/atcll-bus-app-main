import * as React from 'react';
import { Component } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';

import RBSheet from "react-native-raw-bottom-sheet";
import BusInfoMenu from "./BusInfoMenu"
import { StopsData } from '../scripts/StopsData';
import { generate_token } from '../scripts/token_generate';
import sub from "../scripts/subscribe_orion";
import sub_PECI from "../scripts/subscribe_PECI";


import * as Location from 'expo-location';


export default class MapScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buses:[
                {
                    id:1, // bus id 
                    lat:40.633305,
                    lon:-8.659190,
                    speed: 33,
                    linha: [7],
                    eta: 3,
                    next_stop: "Hello world1!"
                },
                {
                    id:52,
                    lat:40.636296,
                    lon:-8.654267,
                    speed: 34,
                    linha: [8],
                    eta: 4,
                    next_stop: "Hello world2!"
                }
            ],

            stops: StopsData(),
            // id do autocarro clicado para aparecer o BusInfoMenu
            bus_clicked_id: 0,
            token: null,
            user: { lat: null, lon: null },
            count: 0
        }
    }

    componentDidMount(){
        Location.watchPositionAsync({enableHighAccuracy:true},
            location => {
                this.setState({ user: { lat: location.coords.latitude ,lon: location.coords.longitude } });
        });
    }
    
    render(){

        if ( this.state.token==null ){
            generate_token().then(
                value => this.setState( {token:value} )
            );
        }

        if( this.state.user.lat!=null && this.state.count==0 ){
            this.map.animateToRegion(region={
                latitude: this.state.user.lat,
                longitude: this.state.user.lon,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
            }, 1000);
            this.setState({count: 1});
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
                            speed:Math.round(value.data[i].speed.value*18/5),
                            linha: [0],
                            eta: 0,
                            next_stop: "NaN"
                        }

                        var timeOfData= Date.parse(value.data[i].dateObserved.value)
                        var now=Date.now()

                        var timeToDeleteBus = 5*1000; //! 5 sec para deletar bus

                        if ( timeOfData > (now- timeToDeleteBus) ){
                            data.push(obj);
                        }
                        
                    }

                return data;
            }
            
        }, 1000)

        return (
            <View style={styles.container}>

                <MapView 
                ref={(map) => { this.map = map; }}
                style={styles.map}
                customMapStyle={[
                    {
                      featureType: "administrative",
                      elementType: "geometry",
                      stylers: [
                      {
                          visibility: "off"
                      }
                      ]
                    },
                    {
                      featureType: "poi",
                      stylers: [
                        {
                          visibility: "off"
                        }
                      ]
                    },
                    {
                      featureType: "road",
                      elementType: "labels.icon",
                      stylers: [
                        {
                          visibility: "off"
                        }
                      ]
                    },
                    {
                      featureType: "transit",
                      stylers: [
                        {
                          visibility: "off"
                        }
                      ]
                    }
                  ]} 
                initialRegion={{//! focar onde o user esta :)
                    latitude: 40.638495,
                    longitude: -8.651443,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                }} 
                >

                { this.state.user.lat !== null ? 
                        <MapView.Marker //! marcador do user
                            coordinate={{
                            latitude: this.state.user.lat,
                            longitude: this.state.user.lon
                            }}
                            title="You are here"
                            image={require('../assets/user.png')}
                        /> 
                    : null 
                }
                
                {this.state.buses.map((val, index) => {//! BUS MARKER
                    return (<MapView.Marker
                            coordinate={{
                            latitude: val.lat,
                            longitude:val.lon
                            }}
                            key={index}
                            // title = { val.linha.toString() }
                            image={require('../assets/bus.png')}
                            onPress={() => { 
                                this.RBSheet.open()
                                // atualizar o valor do id do autocarro clicado para o Businfo menu
                                this.setState({
                                    bus_clicked_id: val.id
                                })
                                }
                            }
                            />); 
                })}

                
                {this.state.stops.map((val, index) => {//! STOP MARKER
                    return (<MapView.Marker
                            coordinate={{
                            latitude: val.lat,
                            longitude:val.lon
                            }}
                            key={index}
                            title = {val.name}
                            image={require('../assets/stop.png')}
                            />); 
                })}

                </MapView>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;}}
                    closeOnDragDown={true}
                    animationType={"fade"}
                    closeOnPressMask={true}
                    customStyles={{
                    wrapper: {
                        backgroundColor: "transparent"
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                    }}
                >
                    
                    <BusInfoMenu buses={this.state.buses} newID={this.state.bus_clicked_id} token={this.state.token}/> 
                </RBSheet>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });
