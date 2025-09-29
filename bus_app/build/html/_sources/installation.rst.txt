Installation
=============

In this project we used Expo CLI to create our app.
To run our project only need to follow until the step 5 of Setup development enviroment and install the libraries that were used.

Setup development enviroment
----------------------------
(see https://docs.expo.dev/get-started/installation/)
(see https://docs.expo.dev/get-started/create-a-new-app/)

1. Install node js (https://nodejs.org/en/)
2. Install expo CLI (npm install --global expo-cli)
3. Install Expo Go (https://play.google.com/store/apps/details?id=host.exp.exponent) - this will alow you to run the app on your phone
4. Install Visual Studio Code (https://code.visualstudio.com/download)
5. (Optional) In Visual Studio Code install these extensions:
    * React Native Tools
    * React-Native/React/Redux Snippets
    * Prettier - Code formatter (turn on format on save in settings of VS Code)
    * Material Icon Theme
6. Create the react native project (expo init <project_name>) and select the "blank" workflow
7. Move to the root folder of the project (cd <project_name>)
8. Run the app (npm start), now you can run the app by scaning the QR code on your phone using the Expo Go app or you can run it on an emulator


Runing the app on an emulator
-----------------------------

(see https://docs.expo.dev/workflow/android-studio-emulator/)

1. Install Android Studio (https://developer.android.com/studio), do the standard installation
2. Add an environment variable to your Path that is displayed inside Android Studio, go to Preferences -> Appearance & Behavior -> System Settings -> Android SDK and copy the box that says "Android SDK Location" (shoud look like this: C:\\Users\\<USERNAME>\\AppData\\Local\\Android\\Sdk)
3. Restart the pc for the changes take place
4. Create an virtual device with your prefered options
5. Now if all is well configured you can run "npm start" and press "a", then the emulator should start running the app (it may take a while the first time)


Libraries used
--------------
(see package.json to see all the libraries installed)


* expo install react-native-screens react-native-safe-area-context
* expo install react-native-gesture-handler react-native-reanimated
* expo install expo-permissions
* expo install react-native-paper
* expo install react-native-webview
* expo install react-native-maps
* expo install expo-location
* expo install react-native-select-dropdown
* expo install react-native-raw-bottom-sheet


