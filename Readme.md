# Viv - Verkehrsinfo für die Wiener Linien (Traffic info for 'Wiener Linien')

This is a small personal project to build an Alexa Skill, that is able to tell when the next bus or tram near the user will arrive. This will be achieved, by utilizing the [Wiener Linien][WLAPI], [Alexa][AlexaAPI], and [Google Maps][MapsAPI] APIs.

### Usage
![AlexaBubble][AlexaBubble]
After the Alexa Skill will be released, a simple sentence like 'Alexa, starte Viv." will activate the Skill on your device. The available intents are saved in the [Interaction Model][InteractionModel]. As a side note, this Skill will only be available in the German Skill Store.

### Software
The software used in this project and its version:
- Node.js 8.11.1
    - alexa-app 4.2.2
    - request 2.85.0
- IntelliJ Webstorm 2018.1.2

[WLAPI]: https://www.wienerlinien.at/eportal3/ep/channelView.do/pageTypeId/66528/channelId/-48664
[AlexaAPI]: https://developer.amazon.com/de/docs/alexa-voice-service/api-overview.html
[MapsAPI]: https://developers.google.com/maps/?hl=de
[InteractionModel]: https://github.com/Peter0014/Viv/blob/master/interactionModel.json
[AlexaBubble]: https://github.com/Peter0014/Viv/blob/master/AlexaBubble.png?raw=true