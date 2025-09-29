App
===
This file contains the main application code. From here we divide the app screens into a drawer menu as well as ask for permission to use the user's gps location.

(For more information about the drawer menu, see https://reactnavigation.org/docs/drawer-based-navigation/).

First we ask for permission to use the user's gps location through the expo-permissions library. (see https://docs.expo.dev/guides/permissions).

.. warning:: the expo-permissions library is going to be deprecated soon, so at some point it's possible that the user location marker will not be shown.

For that we create a function async named _getLocation which will be triggered with componentDidMount (componentDidMount is called when the component is mounted, in this case when the app launches).
Then we wait for the response of the user that will be stored in the status const variable. When the user responds we check if the status is granted. If it isn't, the app shows an alert to inform the user that the gps permission is needed to show their location on screen.

In the render method we render our drawer menu (named MyDrawer) inside the navigation container.

.. code-block:: 

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

The MyDrawer component is our component for the menu, it's divided in Drawer.Screen's , one for each screen of the app (Home,Lines,BusShedule,LiveTraffic,About).)

.. code-block::

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

