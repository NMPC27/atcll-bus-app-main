MapScreen
=========

This is the main screen (Home) of the App.

In the state of this class we have the following variables:

* buses: its an array with all the info of the buses that we get from orion service.
* stops: its an array with all the stops (see scripts->stops_data).
* bus_clicked_id: the id of the bus that we clicked on the map.
* token: the token that we generate to be able to do requests to the orion service.
* user: is the current location of the user that will be updated by Location.watchPositionAsync( ... this.setState({ user: ...} ) )
* count: its used to only focus the user position once, otherwise the map will be focused every time in the user location.

Data stucture of buses in state.

.. code-block:: javascript

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
                id:2,
                lat:40.636296,
                lon:-8.654267,
                speed: 34,
                linha: [8],
                eta: 4,
                next_stop: "Hello world2!"
            }
        ],
        stops: StopsData(),
        bus_clicked_id: 0,
        token: null,
        user: { lat: null, lon: null },
        count: 0
    }

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

Inside the render() is generated the token that alows us to access the orion service of IT. 
Because answer from the service is not immediate we use promisses, when the device receives the answer from the orion service the token will be updated in the state to be used afterwards.
(see scripts->token_generate for more details)

.. code-block:: javascript

    if ( this.state.token==null ){
        generate_token().then(
            value => this.setState( {token:value} )
        );
    }

To get the data from the orion service we use the token that we have generated in the previous step.
To update the data from the buses we call the function sub() every second using the setTimeout(()=> { code_here },1000) method.
In The 'sub' function (from the subscribe_orion script) we parse the token generated in the previous step and returns a json with the data of all current detected buses.
Before we update the state we need to filter the data received, in the filter_orion function we generate an array to match our state data structure.
In filter_orion we also check if the bus was detected at least 5 seconds ago, if it was we update the state with the new data. (if ( timeOfData > (now- timeToDeleteBus) )) 
(see scripts->subscribe_orion for more details)

.. code-block:: javascript

   setTimeout(() => {
        sub(this.state.token).then(

        res => this.setState( {buses:filter_orion(res)} ));

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




The last thing in the render() is an animation that we use to show the user location when its detected (it only make this animation once).
(see https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md )

.. note:: 
    
    this.map is the reference created in MapView atribute ref.

.. code-block:: javascript

    if( this.state.user.lat!=null && this.state.count==0 ){
        this.map.animateToRegion(region={
            latitude: this.state.user.lat,
            longitude: this.state.user.lon,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
        }, 1000);
        this.setState({count: 1});
    }


In the return we use the MapView component to display the map and the several markers, like user,buses and stops.

MapView is used to display the map.
(see https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md )
MapView we use the following atributes:

* ref: need to reference the map to use the animateToRegion method
* style: the style of the map to ocupy the full screen
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
* *onPress*: on press it will show an info menu about the bus (see RBSheet next in this page)

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


RBSheet is used to display info about the bus.
RBSheet we use the following atributes:

* ref: need to reference the sheet to open onPress of the buses markers
* *rest of the atributes*: see the documentation 

(see https://github.com/nysamnang/react-native-raw-bottom-sheet)

Inside of the RBSheet we show the BusInfoMenu and pass it the necessary information that it needs to show the user iformation about that bus.

.. toctree::
   :maxdepth: 6

   bus_info_menu


.. code-block::

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
                




