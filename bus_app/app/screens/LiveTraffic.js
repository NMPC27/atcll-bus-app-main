import * as React from 'react';
import { Component } from 'react';
import MapView from 'react-native-maps';
import { Polyline } from "react-native-maps";
import { StyleSheet, View, Dimensions } from 'react-native';
import { generate_token } from '../scripts/token_generate';
import { RoadsData } from '../scripts/RoadsData';
import RBSheet from "react-native-raw-bottom-sheet";
import RoadInfoMenu from "./RoadInfoMenu"

import sub_traffic from "../scripts/subscribe_traffic"


import * as Location from 'expo-location';

export default class LiveTraffic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: null,
            road_clicked_id: null,
            user: { lat: null, lon: null },
            count: 0,
            dict : {
              p1_1:{  id: 11,
                      color: "#00FF00",
                      speed: -1,
                      name: "Rua da pega",
                      vehicleCount: 0
                  },
              p1_2: { id: 12, 
                      color: "#00FF00",
                      speed: -1,
                      name: "Rua da pega",
                      vehicleCount: 0
                  },

              p3_1: { id: 31, 
                      color: "#00FF00",
                      speed: -1,
                      name: "Rua do Alavário",
                      vehicleCount: 0
                  },
              p3_2: { id: 32,
                      color: "#00FF00",
                      speed: -1,
                      name: "Rua do Alavário",
                      vehicleCount: 0
                  },
              
              p30_1: {id: 301,  
                      color: "#00FF00",
                      speed: -1,
                      name: "Avenida 25 de Abril",
                      vehicleCount: 0
                  },
              p30_2: {id: 302,  
                      color: "#00FF00",
                      speed: -1,
                      name: "Avenida 25 de Abril",
                      vehicleCount: 0
                  },

              p33_1: {id: 331,  
                      color: "#00FF00",
                      speed: -1,
                      name: "Rua Mário Sacramento",
                      vehicleCount: 0
                  },
              p33_2: {id: 332,  
                      color: "#00FF00",
                      speed: -1,
                      name: "Rua Mário Sacramento",
                      vehicleCount: 0
                  },

              p35_1: {id: 351,  
                      color: "#00FF00",
                      speed: -1,
                      name: "Avenida da Universidade",
                      vehicleCount: 0
                  },
              p35_2: { id: 352,
                      color: "#00FF00",
                      speed: -1,
                      name: "Avenida da Universidade",
                      vehicleCount: 0
              }
            }

        };
      }
    
    componentDidMount(){
        Location.watchPositionAsync({enableHighAccuracy:true},
            location => {
                this.setState({ user: { lat: location.coords.latitude ,lon: location.coords.longitude } });
        });
    }

      render() {

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
            this.setState({count:1});
        }

        setTimeout(() => {
            sub_traffic(this.state.token).then(

                res => this.setState( {dict:filter_radar(res)} ));

                function filter_radar(res) {
                    
                    var dict = {
                        p1_1:{  id: 11,
                                color: "#00FF00",
                                speed: -1,
                                name: "Rua da pega",
                                vehicleCount: 0
                            },
                        p1_2: { id: 12, 
                                color: "#00FF00",
                                speed: -1,
                                name: "Rua da pega",
                                vehicleCount: 0
                            },

                        p3_1: { id: 31, 
                                color: "#00FF00",
                                speed: -1,
                                name: "Rua do Alavário",
                                vehicleCount: 0
                            },
                        p3_2: { id: 32,
                                color: "#00FF00",
                                speed: -1,
                                name: "Rua do Alavário",
                                vehicleCount: 0
                            },
                        
                        p30_1: {id: 301,  
                                color: "#00FF00",
                                speed: -1,
                                name: "Avenida 25 de Abril",
                                vehicleCount: 0
                            },
                        p30_2: {id: 302,  
                                color: "#00FF00",
                                speed: -1,
                                name: "Avenida 25 de Abril",
                                vehicleCount: 0
                            },

                        p33_1: {id: 331,  
                                color: "#00FF00",
                                speed: -1,
                                name: "Rua Mário Sacramento",
                                vehicleCount: 0
                            },
                        p33_2: {id: 332,  
                                color: "#00FF00",
                                speed: -1,
                                name: "Rua Mário Sacramento",
                                vehicleCount: 0
                            },

                        p35_1: {id: 351,  
                                color: "#00FF00",
                                speed: -1,
                                name: "Avenida da Universidade",
                                vehicleCount: 0
                            },
                        p35_2: { id: 352,
                                color: "#00FF00",
                                speed: -1,
                                name: "Avenida da Universidade",
                                vehicleCount: 0
                        }
                    };
    
                    //var now=Date.now()
                    //var timeToDeleteInfo = 5*1000;
                    
                    for (let i = 0; i < res.data.length; i++) {
    
                        //var timeOfData= Date.parse(res.data[i].dateObserved.value);
    
                        //if ( timeOfData > (now-timeToDeleteInfo) ){

                            //var tmp=calculate_speed(res.data[i].speedLight.value,res.data[i].speedHeavy.value,res.data[i].vehicleHeavy.value,res.data[i].vehicleLight.value);

                            if(res.data[i].id == "p1" && res.data[i].radardata.value.faixa == 1){                          
                                dict.p1_1.speed=res.data[i].radardata.value.average_speed;
                                dict.p1_1.color=res.data[i].radardata.value.cor;
                                dict.p1_1.vehicleCount=res.data[i].radardata.value.average_count;
                            }else if(res.data[i].id == "p1" && res.data[i].radardata.value.faixa == 2){
                                dict.p1_2.speed=res.data[i].radardata.value.average_speed;
                                dict.p1_2.color=res.data[i].radardata.value.cor;
                                dict.p1_2.vehicleCount=res.data[i].radardata.value.average_count;
                            }else if(res.data[i].id == "p3" && res.data[i].radardata.value.faixa == 1){
                                dict.p3_1.speed=res.data[i].radardata.value.average_speed;
                                dict.p3_1.color=res.data[i].radardata.value.cor;
                                dict.p3_1.vehicleCount=res.data[i].radardata.value.average_count;
                            }else if(res.data[i].id == "p3" && res.data[i].radardata.value.faixa == 2){
                                dict.p3_2.speed=res.data[i].radardata.value.average_speed;
                                dict.p3_2.color=res.data[i].radardata.value.cor;
                                dict.p3_2.vehicleCount=res.data[i].radardata.value.average_count;
                            }else if(res.data[i].id == "p30" && res.data[i].radardata.value.faixa == 1){
                                dict.p30_1.speed=res.data[i].radardata.value.average_speed;
                                dict.p30_1.color=res.data[i].radardata.value.cor;
                                dict.p30_1.vehicleCount=res.data[i].radardata.value.average_count;
                            }else if(res.data[i].id == "p30" && res.data[i].radardata.value.faixa == 2){
                                dict.p30_2.speed=res.data[i].radardata.value.average_speed;
                                dict.p30_2.color=res.data[i].radardata.value.cor;
                                dict.p30_2.vehicleCount=res.data[i].radardata.value.average_count;
                            }else if(res.data[i].id == "p33" && res.data[i].radardata.value.faixa == 1){
                                dict.p33_1.speed=res.data[i].radardata.value.average_speed;
                                dict.p33_1.color=res.data[i].radardata.value.cor;
                                dict.p33_1.vehicleCount=res.data[i].radardata.value.average_count;
                            }else if(res.data[i].id == "p33" && res.data[i].radardata.value.faixa == 2){
                                dict.p33_2.speed=res.data[i].radardata.value.average_speed;
                                dict.p33_2.color=res.data[i].radardata.value.cor;
                                dict.p33_2.vehicleCount=res.data[i].radardata.value.average_count;
                            }else if(res.data[i].id == "p35" && res.data[i].radardata.value.faixa == 1){
                                dict.p35_1.speed=res.data[i].radardata.value.average_speed;
                                dict.p35_1.color=res.data[i].radardata.value.cor;
                                dict.p35_1.vehicleCount=res.data[i].radardata.value.average_count;
                            }else if(res.data[i].id == "p35" && res.data[i].radardata.value.faixa == 2){
                                dict.p35_2.speed=res.data[i].radardata.value.average_speed;
                                dict.p35_2.color=res.data[i].radardata.value.cor;
                                dict.p35_2.vehicleCount=res.data[i].radardata.value.average_count;
                            }else{
                                console.log("Error: unknown id");
                                console.log(res.data[i].id);
                                console.log(res.data[i].radardata.value.faixa);
                            }

                        
    
                    }
                    

                return dict;
            }

            function calculate_speed(speed_ligeiro,speed_pessado,num_pesado,num_ligeiro) {

                var vehicleCount=num_ligeiro+num_pesado;

                var dict = {
                    speed: -1,
                    color: "#00FF00",
                    vehicleCount: vehicleCount
                }

                var med=0;
                if(num_ligeiro == 0 && num_pesado > 0){
                    med=speed_pessado;
                }else if(num_pesado == 0 && num_ligeiro > 0){
                    med=speed_ligeiro;
                }else if(num_ligeiro > 0 && num_pesado > 0){
                    med=(speed_ligeiro+speed_pessado)/2;
                }

                dict.speed = med*18/5;

                if(dict.speed < 20 || vehicleCount >= 4){
                    dict.color = "#FF0000";
                }else if(dict.speed < 40 || vehicleCount >= 2){
                    dict.color = "#FFFF00";
                }else{
                    dict.color = "#00FF00";
                }
            
                return dict;
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

                <Polyline //! P1 favor
                    coordinates={RoadsData("p1_1")}
                    strokeColor={this.state.dict.p1_1.color}
                    strokeWidth={5} //->pontos | strokeWeight={5} //->linha
                    lineDashPattern={[0]}
                    tappable={true}
                    onPress={() => { 
                      this.RBSheet.open()
                      this.setState({
                          road_clicked_id: 11
                      })
                      }
                    }
                />

                <Polyline //! P1 contra
                    coordinates={RoadsData("p1_2")}
                    strokeColor={this.state.dict.p1_2.color}
                    strokeWidth={5} //->pontos | strokeWeight={5} //->linha
                    lineDashPattern={[0]}
                    tappable={true}
                    onPress={() => { 
                      this.RBSheet.open()
                      this.setState({
                          road_clicked_id: 12
                      })
                      }
                    }
                />

                <Polyline //! P3 contra
                    coordinates={RoadsData("p3_1")}
                    strokeColor={this.state.dict.p3_1.color}
                    strokeWidth={5} //->pontos | strokeWeight={5} //->linha
                    lineDashPattern={[0]}
                    tappable={true}
                    onPress={() => { 
                      this.RBSheet.open()
                      this.setState({
                          road_clicked_id: 31
                      })
                      }
                    }
                />

                <Polyline //! P3 favor
                    coordinates={RoadsData("p3_2")}
                    strokeColor={this.state.dict.p3_2.color}
                    strokeWidth={5} //->pontos | strokeWeight={5} //->linha
                    lineDashPattern={[0]}
                    tappable={true}
                    onPress={() => { 
                      this.RBSheet.open()
                      this.setState({
                          road_clicked_id: 32
                      })
                      }
                    }
                />

                <Polyline //! P30 favor
                    coordinates={RoadsData("p30_1")}
                    strokeColor={this.state.dict.p30_1.color}
                    strokeWidth={5} //->pontos | strokeWeight={5} //->linha
                    lineDashPattern={[0]}
                    tappable={true}
                    onPress={() => { 
                      this.RBSheet.open()
                      this.setState({
                          road_clicked_id: 301
                      })
                      }
                    }
                />

                <Polyline //! P30 contra
                    coordinates={RoadsData("p30_2")}
                    strokeColor={this.state.dict.p30_2.color}
                    strokeWidth={5} //->pontos | strokeWeight={5} //->linha
                    lineDashPattern={[0]}
                    tappable={true}
                    onPress={() => { 
                      this.RBSheet.open()
                      this.setState({
                          road_clicked_id: 302
                      })
                      }
                    }
                />

                <Polyline //! P33 favor 
                    coordinates={RoadsData("p33_1")}
                    strokeColor={this.state.dict.p30_1.color}
                    strokeWidth={5} //->pontos | strokeWeight={5} //->linha
                    lineDashPattern={[0]}
                    tappable={true}
                    onPress={() => { 
                      this.RBSheet.open()
                      this.setState({
                          road_clicked_id: 331
                      })
                      }
                    }
                />

                <Polyline //! P33 contra
                    coordinates={RoadsData("p33_2")}
                    strokeColor={this.state.dict.p30_2.color}
                    strokeWidth={5} //->pontos | strokeWeight={5} //->linha
                    lineDashPattern={[0]}
                    tappable={true}
                    onPress={() => { 
                      this.RBSheet.open()
                      this.setState({
                          road_clicked_id: 332
                      })
                      }
                    }
                />

                <Polyline //! P35 favor
                    coordinates={RoadsData("p35_1")}
                    strokeColor={this.state.dict.p35_1.color}
                    strokeWidth={5} //->pontos | strokeWeight={5} //->linha
                    lineDashPattern={[0]}
                    tappable={true}
                    onPress={() => { 
                      this.RBSheet.open()
                      this.setState({
                          road_clicked_id: 351
                      })
                      }
                    }
                />

                <Polyline //! P35 contra
                    coordinates={RoadsData("p35_2")}
                    strokeColor={this.state.dict.p35_2.color}
                    strokeWidth={5} //->pontos | strokeWeight={5} //->linha
                    lineDashPattern={[0]}
                    tappable={true}
                    onPress={() => { 
                      this.RBSheet.open()
                      this.setState({
                          road_clicked_id: 352
                      })
                      }
                    }
                />

                </MapView>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;}}
                    height={200}
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
                    
                    <RoadInfoMenu dict={this.state.dict} road_id={this.state.road_clicked_id}/> 
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