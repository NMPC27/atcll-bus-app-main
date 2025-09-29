import * as React from 'react';
import { Avatar, Card} from 'react-native-paper';
import MapView from 'react-native-maps';
import {StyleSheet} from 'react-native';
import { Component } from 'react';

import * as Location from 'expo-location';

const LeftContent = props => <Avatar.Icon {...props} icon="bus" />


export default class LineCard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: { lat: null, lon: null }
    }
  }

  componentDidMount(){
    Location.watchPositionAsync({enableHighAccuracy:true},
        location => {
            this.setState({ user: { lat: location.coords.latitude ,lon: location.coords.longitude } });
    });
  }

    render(){

      return(
        <Card>
          <Card.Title title={this.props.line.toString()} left={LeftContent} />
          <Card.Content>
            <MapView 
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

              {this.props.lineStops.map((val, index) => {//! STOP MARKER
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

                  {this.props.buses.map((val, index) => {//! BUS MARKER
                          return (<MapView.Marker
                                    coordinate={{
                                    latitude: val.lat,
                                    longitude:val.lon
                                    }}
                                    title = { "linha: "+val.linha.toString() }
                                    image={require('../assets/bus.png')}
                                  />); 
                      })}
            </MapView>
          </Card.Content>
        </Card>
      );
    }
  }

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: 300,
  },
});
