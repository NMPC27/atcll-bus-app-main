import * as React from 'react';
import { Alert, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Component } from 'react';

import MapScreen from "./app/screens/MapScreen"
import About from "./app/screens/About"
import Lines from "./app/screens/Lines"
import LiveTraffic from "./app/screens/LiveTraffic"
import BusSchedule from "./app/screens/BusSchedule"

import * as Permissions from 'expo-permissions';


function Home() { 
  return (
      <MapScreen/>
  );
}

function LinesMenu() {
  return (
    <Lines/>
  );
}

function Schedule() {
  return (
      <BusSchedule/> 
  );
}

function LiveTrafficPage() {
  return (
    <LiveTraffic/>
  );
}

function AboutPage() {
  return (
    <About/>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home}/>
      <Drawer.Screen name="Lines" component={LinesMenu} />
      <Drawer.Screen name="Bus Schedule" component={Schedule} />
      <Drawer.Screen name="Live Traffic" component={LiveTrafficPage} />
      <Drawer.Screen name="About" component={AboutPage} />
    </Drawer.Navigator>
  );
}


export default class App extends Component {

  componentDidMount() {
    this._getLocation();
  }

  _getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      Alert.alert(
        "Permição de GPS não concedida",
        "Para poder ver a sua localização no mapa, é necessário que a permissão de GPS seja concedida. Por favor, reinicie a app e conceda a permissão.",
        [
          { text: "OK"}
        ]
      );
    }
  }

  render() {
    return (
      <NavigationContainer>
        <MyDrawer/>
      </NavigationContainer>
    );
  }
}

