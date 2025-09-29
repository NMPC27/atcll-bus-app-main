BusInfoMenu
===========

This class serves to display the information about the bus to the user.
The ID and position of the bus is given by props and the other data such as line, eta and next_stop are received by a subscrition to ORION through the script sub_PECI(see scripts->subscribe_PECI) 

Props:

* newID: the id of the bus that was cliked
* buses: all the data of the current detected buses
* token: token necessary to connect to ORION

We determine the index of the bus that was clicked to get its coresponding data.
If we dont find the bus in the list of buses, it means that we stoped detecting the bus that were cliked.
Otherwise we display the bus info (line, speed, eta and next stop)

To get the bus info, we first run the script sub_PECI(see scripts->subscribe_PECI) and filter the data received with the filter_peci function and update the state with the line, eta and next_stop of the selected bus.
Then we get the data of the bus that was clicked and display it.

*/

* List.Item: see https://callstack.github.io/react-native-paper/list-item.html
* List.Icon: see https://callstack.github.io/react-native-paper/list-icon.html

.. code-block::

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
                              tmp_obj.eta=Math.round(tmp/1000)
                          }

                      })

                      var stop_idx = StopsData().findIndex(x => parseInt(x.id) === parseInt(tmp_obj.stop));
                      return {
                        linha: value.data[i].busData.value.line,
                        eta: tmp_obj.eta,
                        next_stop: StopsData()[stop_idx].name
                      }
                    }
                }

                return {
                  linha:"Nan",
                  eta:"Nan",
                  next_stop:"Nan"
                };
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
                title={"ETA: " + this.state.eta}
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
