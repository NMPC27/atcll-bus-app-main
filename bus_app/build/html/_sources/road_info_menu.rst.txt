RoadInfoMenu
============

This is a simple class that displays info about the road to the user.
All the necessary info about the roads is given by props.

Props:

* road_id: the id of the road that was cliked
* dict: all the data that are being detected by the radars


We look for the id of the road that was clicked in our dictionary to get its coresponding data.
Then we display the road info (street name, average speed and number of vehicles)

* List.Item: see https://callstack.github.io/react-native-paper/list-item.html
* List.Icon: see https://callstack.github.io/react-native-paper/list-icon.html

.. code-block::

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

