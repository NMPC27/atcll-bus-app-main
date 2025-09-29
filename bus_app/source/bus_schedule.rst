BusSchedule
===========
This screen shows the PDF's containing the schedule from the buses that are available in the aveiroBus website.

In the state of this class we have the following variables:

* linhas: an array with the numbers of the existing lines.
* iFrameUrl: a variable that is used to store the coded url to then use in the webView component.
* jsCode: a string of javascript code that going to be injected in the page of the PDF to remove all buttons in the PDF.

In the render method two main parts: the dropdown menu and the webView component.

The SelectDropdown component is from the react-native-material-dropdown library (see https://github.com/AdelRedaa97/react-native-select-dropdown for more details). The data attribute will be our array of lines ('linhas') and the onSelect event triggers the update in the state of the class with the url which contains the schedule of the new line selected by the user.

.. code-block:: 

    <SelectDropdown
                              data={this.state.linhas}
                              defaultButtonText={"Escolha a linha"}
                              onSelect={(selectedItem, index) => {

                                switch(selectedItem) {
                                  case "1":
                                    this.setState( {iFrameUrl:'https://docs.google.com/gview?url=' + encodeURIComponent('https://www.aveirobus.pt/sites/default/files/horarios/aveiro_bus_paragem_-_horario_linha_297x297_l1_2009.pdf')} );
                                    break;
                                  case "2/9":
                                    this.setState( {iFrameUrl:'https://docs.google.com/gview?url=' + encodeURIComponent('https://www.aveirobus.pt/sites/default/files/horarios/aveiro-bus_paragem-horario-linha_297x297_l2_9_2009.pdf')} );
                                    break;
                                  case "3":
                                    this.setState( {iFrameUrl:'https://docs.google.com/gview?url=' + encodeURIComponent('https://www.aveirobus.pt/sites/default/files/horarios/aveiro_bus_paragem_-_horario_linha_297x297_l3_2009_0.pdf')} );
                                    break;
                                  case "4":
                                    this.setState( {iFrameUrl:'https://docs.google.com/gview?url=' + encodeURIComponent('https://www.aveirobus.pt/sites/default/files/horarios/aveiro_bus_paragem-horariolinha_297x297_l4_2109.pdf')} );
                                    break;
                                  case "5/7":
                                    this.setState( {iFrameUrl:'https://docs.google.com/gview?url=' + encodeURIComponent('https://www.aveirobus.pt/sites/default/files/horarios/aveiro-bus_paragem-horario-linha_297x297_l5_7_2009.pdf')} );
                                    break;
                                  case "6":
                                    this.setState( {iFrameUrl:'https://docs.google.com/gview?url=' + encodeURIComponent('https://www.aveirobus.pt/sites/default/files/horarios/aveiro-bus-paragem-horario-linha-297x297-l6-2107.pdf')} );
                                    break;
                                  case "8":
                                    this.setState( {iFrameUrl:'https://docs.google.com/gview?url=' + encodeURIComponent('https://www.aveirobus.pt/sites/default/files/horarios/aveiro_bus_paragem_horario_linha_297x297_l8_2105.pdf')} );
                                    break;
                                  case "10":
                                    this.setState( {iFrameUrl:'https://docs.google.com/gview?url=' + encodeURIComponent('https://www.aveirobus.pt/sites/default/files/horarios/aveiro-bus_paragem-horario-linha_297x297_l10_2009.pdf')} );
                                    break;
                                  case "11":
                                    this.setState( {iFrameUrl:'https://docs.google.com/gview?url=' + encodeURIComponent('https://www.aveirobus.pt/sites/default/files/horarios/aveiro-bus_pparagem-horario-linha_297x297_l11_2009a.pdf')} );
                                    break;
                                  case "12":
                                    this.setState( {iFrameUrl:'https://docs.google.com/gview?url=' + encodeURIComponent('https://www.aveirobus.pt/sites/default/files/horarios/aveiro_bus_paragem-horario_linha_297x297_l12_2110.pdf')} );
                                    break;
                                  case "13":
                                    this.setState( {iFrameUrl:'https://docs.google.com/gview?url=' + encodeURIComponent('https://www.aveirobus.pt/sites/default/files/horarios/afi_aveiro_bus_paragem_-_horario_linha_297x297_l13_1808.pdf')} );
                                    break;
                                  default:
                                    // code block
                                }
                              }}
                              buttonTextAfterSelection={(selectedItem, index) => {
                                  // text represented after item is selected
                                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                                  return selectedItem
                              }}
                      />

Lastly the WebView component is used from the react native webview (see https://github.com/react-native-webview/react-native-webview for more information).

In this component we give the source (which is the coded url of the schedule) and give the javascript code that needs to be injected to remove the extra buttons on the PDF.

.. code-block::

    <WebView 
      source={{ uri: this.state.iFrameUrl }} 
      originWhitelist={['*']}
      javaScriptEnabledAndroid={true}
      injectedJavaScript={this.state.jsCode}

      style={styles.video}
    />




