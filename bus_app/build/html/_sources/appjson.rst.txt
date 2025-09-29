App json
========

This is an auto gerated file that stores important data to the app, like name and icon.
(see https://docs.expo.dev/versions/latest/config/app/)

App json atributes:

* name: The name of the app
* icon: The icon of the app
* splash: the image that apears when the app is loading
* ios: configuration for iOS
* android: configuration for Android
* android -> package: the package name for your Android standalone app. You make it up, but it needs to be unique on the Play Store.
* android -> googleMaps -> apiKey: VERY IMPORTANT. You need to get a Google Maps API key from Google otherwise the map will not load. (see https://docs.expo.dev/versions/latest/sdk/map-view/#deploying-google-maps-to-an-android-standalone)

Problem map not showing or app stuck on loading screen:


If you have problems with the map not showing, probably its because the apiKey is wrong.
Before the next point you should have already logged in Google Cloud Platform and your expo accounts and also have builded the app at least once (expo build:android). 


The SHA-1 that you put on Google Cloud Platform (https://console.developers.google.com/apis) -> Credentials -> "Restrict usage to your Android apps" should be the same that you have in expo (https://expo.dev/) -> Projects -> <YOUR_NAME_PROJECT> -> Credentials -> <CHOSE_THE_APP_IDENTIFIER_THAT_MATCHES_YOUR_PACKAGE> -> SHA-1 Certificate Fingerprint




