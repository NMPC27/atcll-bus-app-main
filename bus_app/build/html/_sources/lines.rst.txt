Lines
=======

This screen shows the stops and the buses in each line as well as the estimated time of arrival of a bus in each stop of the respective line.

In the state of this class we have the following variables:

* buses: its an array with all the info of the buses that we get from orion service.
* stops: its an array with all the stops (see scripts->stops_data).
* token: the token that we generate to be able to do requests to the orion service.
* Linha_selected: its a integer that stores the current line selected in the dropdown menu to later switch the information shown according to the line selected.

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
        ...
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
In The 'sub' Function (from the subscribe_orion script) we parse the token generated in the previous step and returns a json with the data of all current detected buses.
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

The next segment of code serves to filter our bus data, in this case we only want to show the buses that are doing the line_selected by the user, to later send this data to the LineCard component (see screens->LineCard).

.. code-block:: javascript

    const linhas = ["1", "2/9", "3", "4", "5/7", "6","8", "10", "11", "12", "13"]

        const line_selected = this.state.Linha_selected
        var line_buses = this.state.buses.filter(function(bus) {
            
            return bus.linha.includes(line_selected)
        
        });

Lastly we have the return of the render method.
First we need a view component to wrap every other component. Then this component is divided in two parts: a View for the dropdown button and a ScrollView for the LineCard AND LinesTable components.
For the dropdown button we use the SelectDropdown component from the react-native-material-dropdown library (see https://github.com/AdelRedaa97/react-native-select-dropdown for more details). The data attribute will be our array of lines ('linhas') and the onSelect event triggers the update in the state of the class with the new line selected by the user.

Then in the ScrollView we call the LineCard component (with filtered array of buses previously created 'line_buses', the stops of the line selected and the line_selected through props) and the LinesTable component. 
(see screens->LineCard and screens->LinesTable for more details).

.. warning:: Dar update a documentação quando o lines table tiver os dados para receber.


.. code-block::

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
                    <LinesTable/>
                </ScrollView>  
                
            </View>
        );

.. toctree::
    :maxdepth: 6

    line_card
    lines_table
    