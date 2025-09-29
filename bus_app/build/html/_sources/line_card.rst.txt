LineCard
========
This component is used to display the card that contains the map with the stops and buses doing a certain line.

In the state of this class we have the following variables:

* user: it's a variable containing the latitude and longitude of the user.



On load ( componentDidMount ) of this class we start looking for the user's location and update the state with it.
The method watchPositionAsync subscribes to location updates from the device therefore the location will be updated in real time. 
(see https://docs.expo.dev/versions/latest/sdk/location/#locationwatchpositionasyncoptions-callback )

.. code-block:: javascript

    componentDidMount(){
        Location.watchPositionAsync({enableHighAccuracy:true},
            location => {
                this.setState({user:{lat: location.coords.latitude ,lon: location.coords.longitude}});
        });
    }

In the return of the render method we use the Card component from the react native paper library (see https://callstack.github.io/react-native-paper/card.html for more information) as well as MapView component to display the map and the several markers, like user,buses and stops.

MapView is used to display the map.
(see https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md )
MapView we use the following atributes:

* ref: need to reference the map to use the animateToRegion method
* style: the style of the map to ocupy most of the card
* customMapStyle: style to simplify the map (remove the points of interest in the map)
* initialRegion: the initial region of the map ( center of Aveiro )

.. code-block::

    <MapView 
    ref={(map) => { this.map = map; }}
    style={styles.map}
    customMapStyle={ ... } 
    initialRegion={{
        latitude: 40.638495,
        longitude: -8.651443,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    }} 
    >
    ...
    </MapView>

MapView.Marker is used to display the markers.
(see https://github.com/react-native-maps/react-native-maps/blob/master/docs/marker.md )
MapView.Marker we use the following atributes:

* coordinate: the coordinates of the marker
* title: the title of the marker (on press shows the title)
* image: the image of the marker
* *key*: the key of the marker because we create several markers (warning: if we dont use the key)

.. note:: 
    
    { this.state.user.lat !== null ? ... : null } is used to show the user location only when its detected.

    { this.state.buses.bus((val, index) => { return ( ... );}) } is used to render all the buses/stops.


.. code-block:: javascript

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


