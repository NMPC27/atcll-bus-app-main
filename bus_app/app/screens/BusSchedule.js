import * as React from 'react';
import { Component } from 'react';
import { WebView } from 'react-native-webview';
import {StyleSheet, Dimensions, View} from 'react-native';


// dropdown para selecionar linha
import SelectDropdown from 'react-native-select-dropdown'

export default class BusSchedule extends Component {

  constructor(props) {
    super(props);

    this.state = {
      linhas : ["1", "2/9", "3", "4", "5/7", "6","8", "10", "11", "12", "13"],
      iFrameUrl : 'https://docs.google.com/gview?url=' + encodeURIComponent('https://www.aveirobus.pt/sites/default/files/horarios/aveiro_bus_paragem_-_horario_linha_297x297_l1_2009.pdf'),

      jsCode : `document.querySelector('.ndfHFb-c4YZDc-Wrql6b').remove(); document.querySelector('.ndfHFb-c4YZDc-q77wGc').remove(); document.querySelector('.ndfHFb-c4YZDc-cYSp0e-DARUcf-hSRGPd').remove();`

    }


  }
 render(){
  return (
    <View style={styles.container} >
        <View style={styles.dropdown}>
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
          </View>

    <WebView 
      source={{ uri: this.state.iFrameUrl }} 
      originWhitelist={['*']}
      javaScriptEnabledAndroid={true}
      injectedJavaScript={this.state.jsCode}

      style={styles.video}
    />
    </View>
  );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

  },
  dropdown: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  video: {
    width: Dimensions.get('window').width,
    flex: 2
  }
});