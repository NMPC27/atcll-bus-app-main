LinesTable
==========
This component is used to display the table with the stops and respective time of arrival for each one of the stops in a respective line.

In the render method, we use the DataTable component from the react native paper library (see https://callstack.github.io/react-native-paper/data-table.html for more information).

Props:

* line: the current line selected in the lines menu
* token: token necessary to connect to ORION

To get the prediction for the current line , we first run the script sub_PECI(see scripts->subscribe_PECI) and filter the data received with the filter_peci function and update the state with an array of stop-arrival time for each pair.

.. code-block:: javascript

    var line = this.props.line

    if ( this.props.line != this.state.curr_line ){

      sub_PECI(this.props.token).then(
        res => {this.setState({tableData: filter_peci(res)});}
      )
  
      function filter_peci(value){

        for (let i=0;i<value.data.length; i++){
          if(value.data[i].dateObserved != null){continue}
          if (value.data[i].busData.value.line == line){

            var dict=value.data[i].busData.value.prediction

            if (Object.keys(dict).length === 0){
              return [[null,"No prediction available"]]
            }

            var items = Object.keys(dict).map(
              (key) => { 
                var stop_idx = StopsData().findIndex(x => parseInt(x.id) === parseInt(key));
                return [dict[key], StopsData()[stop_idx].name] 
              });
            
            items.sort();

            return items
          }
          
        }
        
        return [[null,"No bus in this line"]]
      }
      
      this.setState({curr_line: this.props.line})
    }

Then using the following code, we map all the data, coming from the state updated previously, into the table.

.. code-block:: javascript

    {this.state.tableData.map((val, index) => {
                    return (
                        <DataTable.Row>
                            <DataTable.Cell style={{flex: 5}} >{ val[1] }</DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: 'flex-end'}}>{ val[0] }</DataTable.Cell>
                        </DataTable.Row>
                        );

            })}

<>