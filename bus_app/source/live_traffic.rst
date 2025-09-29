LiveTraffic
===========

This is the Live Traffic screen of the App.

In the state of this class we have the following variables:

* token: the token that we generate to be able to do requests to the orion service.
* road_clicked_id: the id of the road that we clicked on the map.
* user: is the current location of the user that will be updated by Location.watchPositionAsync( ... this.setState({ user: ...} ) )
* count: its used to only focus the user position once, otherwise the map will be focused every time in the user location.
* dict: its an dictionary with each road here we have a radar. For each road we have 2 dictionarys, one for each way.

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
Because answer from the service is not immediate we use promisses, when the device recives the answer from the orion service the token will be updated in the state to be used afterwards.
(see scripts->token_generate for more details)

.. code-block:: javascript

    if ( this.state.token==null ){
        generate_token().then(
            value => this.setState( {token:value} )
        );
    }

To get the data from the orion service we use the token that we have generated in the previous step.
To update the data from the buses we call the function sub() every second using the setTimeout(()=> { code_here },1000) method.
The function sub we parse the token generated in the previous step and returns a json with the data of all the radars.
Before we update the state we need to filter the data received, in the filter_radar function we generate an dictionary to match our state data structure.
In filter_orion we also check if the info of the radar was detected at least 5 seconds ago, if it was we update the state with the new data. (if ( timeOfData > (now-timeToDeleteInfo) )) 
In the calculate_speed function we calculate the the average speed, the color of the line and the total vehicles in the radar. We determine the color of the line based in the number of vehicles and the speed detected in the radar.
(see scripts->subscribe_orion for more details) 

.. code-block:: javascript

   setTimeout(() => {
      sub_radar(this.state.token).then(

            res => this.setState( {dict:filter_radar(res)} ));

            function filter_radar(res) {
               
               var dict = {
                  p1_1:{  id: 11,
                           color: "#00FF00",
                           speed: -1,
                           name: "Rua da pega",
                           vehicleCount: 0
                        }, ...
               };

               var now=Date.now()
               var timeToDeleteInfo = 5*1000;

               for (let i = 0; i < res.data.length; i++) {

                  var timeOfData= Date.parse(res.data[i].dateObserved.value);

                  if ( timeOfData > (now-timeToDeleteInfo) ){

                        var tmp=calculate_speed(res.data[i].speedLight.value,res.data[i].speedHeavy.value,res.data[i].vehicleHeavy.value,res.data[i].vehicleLight.value);

                        if(res.data[i].id == "urn:ngsi-ld:Traffic:aveiro_radar:p1" && res.data[i].faixa.value == 1){                          
                           dict.p1_1.speed=tmp.speed;
                           dict.p1_1.color=tmp.color;
                           dict.p1_1.vehicleCount=tmp.vehicleCount;
                        }else if(res.data[i].id == "urn:ngsi-ld:Traffic:aveiro_radar:p1" && res.data[i].faixa.value == 2){ ... }
                        ...
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

            if(dict.speed < 20 && vehicleCount >= 4){
               dict.color = "#FF0000";
            }else if(dict.speed < 40 && vehicleCount >= 2){
               dict.color = "#FFFF00";
            }else{
               dict.color = "#00FF00";
            }
      
            return dict;
      }
      
   }, 1000)

In the return we use the MapView component to display the map and the several roads using Polyline.

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

Polyline is used to display the roads.
(see https://github.com/react-native-maps/react-native-maps/blob/master/docs/polygon.md)
Polyline we use the following atributes:

* coordinates: an array of the coordinates of the road
* strokeColor: the color of the road
* strokeWidth: the width of the line
* lineDashPattern: the pattern of the line ( distance between the points of the road )
* tappable: if the road is tappable
* onPress: when the road is pressed an info menu will be displayed (see RBSheet next in this page)

.. code-block::

   <Polyline //! P1 favor
      coordinates={RoadsData("p1_1")}
      strokeColor={this.state.dict.p1_1.color}
      strokeWidth={5} 
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

RBSheet is used to display info about the road.
RBSheet we use the following atributes:

* ref: need to reference the sheet to open onPress of the Polyline
* *rest of the atributes*: see the documentation 

(see https://github.com/nysamnang/react-native-raw-bottom-sheet)

Inside of the RBSheet we show the RoadInfoMenu and pass it the necessary information that it needs to show the user iformation about that bus.

.. toctree::
   :maxdepth: 6

   road_info_menu
   
.. code-block::

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
