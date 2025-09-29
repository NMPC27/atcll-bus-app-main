import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Linking
} from 'react-native';

export default class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:0, color:"#000000", icon: null, name: "                Alunos", tags:[]},
        {id:1, color:"#FF4500", icon: require('../assets/cunha.jpg'), name: "Nuno Cunha", tags:['98124','UI']},
        {id:2, color:"#6A5ACD", icon: require('../assets/pedro.png'), name: "Pedro Lima", tags:['97860','UI']}, 
        {id:3, color:"#87CEEB", icon: require('../assets/xanex.jpg'), name: "Alexandre Gago", tags:['98123' ,'AI']}, 
        {id:4, color:"#4682B4", icon: require('../assets/kaluza.jpg'), name: "Bernardo Kaluza", tags:['97521','AI']}, 
        {id:5, color:"#FF69B4", icon: require('../assets/silveira.png'), name: "Filipe Silveira", tags:['97981','Servidor']}, 
        {id:6, color:"#00BFFF", icon: require('../assets/claudia.jpg'), name: "Ana Cláudia", tags:['98678','Servidor']}, 

        {id:7, color:"#000000", icon: null, name: "           Orientadores", tags:[]},
        {id:8, color:"#FF4500", icon: require('../assets/susana.jpg'), name: "Susana Sargento", tags:['Professor']},
        {id:9, color:"#87CEEB", icon: require('../assets/rito.jpg'), name: "Pedro Rito", tags:['Professor']}, 
        {id:10, color:"#4682B4", icon: require('../assets/miguel.jpg'), name: "Miguel Luís", tags:['Professor']}, 

        {id:7, color:"#000000", icon: null, name: "        Agradecimentos", tags:[]},
        {id:8, color:"#FF4500", icon: require('../assets/hugo.png'), name: "Hugo Leal", tags:['Bolseiro']},
      ],
    };
  }


  renderTags = (item) =>{
    return item.tags.map((tag, key) => {
      return (
        <TouchableOpacity key={key} style={styles.btnColor}>
          <Text>{tag}</Text>
        </TouchableOpacity> 
      );
    })
  }

  render() {
    return (    
        <View>
          <Text>    For more information 
            <Text style={{color: 'blue'}}
              onPress={() => Linking.openURL('https://aveiro-living-lab.it.pt/')}>
            https://aveiro-living-lab.it.pt/
            </Text>
          </Text>
        <FlatList 
          style={styles.notificationList}
          data={this.state.data}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={[styles.card, {borderColor:item.color}]}>
                <View style={styles.cardContent}>
                  <Image style={[styles.image, styles.imageContent]} source={ item.icon }/>
                  <Text style={styles.name}>{item.name}</Text>
                </View>
                <View style={[styles.cardContent, styles.tagsContent]}>
                  {this.renderTags(item)}
                </View>
              </TouchableOpacity>
            )
          }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  formContent:{
    flexDirection: 'row',
    marginTop:30,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    height:45,
    flexDirection: 'row',
    alignItems:'center',
    flex:1,
    margin:10,
  },
  icon:{
    width:30,
    height:30,
  },
  iconBtnSearch:{
    alignSelf:'center'
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    marginLeft:15,
    justifyContent: 'center'
  },
  notificationList:{
    marginTop:20,
    padding:10,
  },
  card: {
    height:null,
    paddingTop:10,
    paddingBottom:10,
    marginTop:5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    borderTopWidth:40,
    marginBottom:20,
  },
  cardContent:{
    flexDirection:'row',
    marginLeft:10, 
  },
  imageContent:{
    marginTop:-40,
  },
  tagsContent:{
    marginTop:10,
    flexWrap:'wrap'
  },
  image:{
    width:60,
    height:60,
    borderRadius:30,
  },
  name:{
    fontSize:20,
    fontWeight: 'bold',
    marginLeft:10,
    alignSelf: 'center'
  },
  btnColor: {
    padding:10,
    borderRadius:40,
    marginHorizontal:3,
    backgroundColor: "#eee",
    marginTop:5,
  },
  
});  
                                            