'use strict';

global.DEBUG = true;

// External imports
const request = require('request');
const alexa = require('alexa-app');

// Internal imports
const Messages = require('./Messages');
const Intents = require('./Intents');
const Constants = require('./Constants');

// Variables
let deviceId = -1;
let apiConsentToken = -1;
let apiAccessToken = -1;
let apiEndpoint = "";

let address = {
    stateOrRegion: "",
    city: "",
    countryCode: "",
    postalCode: -1,
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    districtOrCounty: ""
};

let app = new alexa.app();

app.pre = function (request, response, type) {
    if (DEBUG) {
        request.applicationId = Constants.APP_ID;
        deviceId = Constants.DEVICE_ID;
        apiAccessToken = Constants.API_ACCESS_TOKEN;
        apiConsentToken = Constants.API_CONSENT_TOKEN;
        alexa.apiEndpoint = Constants.API_ENDPOINT;
    }

    console.info("Execution STARTED - Alexa skill with APP_ID = " + request.applicationId);

    if (request.applicationId !== Constants.APP_ID) {
        throw 101;
    }

    let systemInfo = request.context.System;
    console.info("System Context: ", systemInfo);

    if (typeof deviceId === "undefined" || deviceId === -1) {
        deviceId = systemInfo.device.deviceId;
        console.info("DeviceId: ", deviceId);
    }
    if (typeof apiAccessToken === "undefined" || apiAccessToken === -1) {
        apiAccessToken = systemInfo.apiAccessToken;
        console.info("API Access Token: ", apiAccessToken);
    }
    if (typeof apiConsentToken === "undefined" || apiConsentToken === -1) {
        apiConsentToken = systemInfo.user.permissions.consentToken;
        console.info("API Consent Token: ", apiConsentToken);
    }
    if (typeof apiEndpoint === "undefined" || apiEndpoint === "") {
        apiEndpoint = systemInfo.apiEndpoint;
        console.info("API Endpoint: ", apiEndpoint);
    }
    if (typeof apiConsentToken !== "undefined" && address.postalCode === -1) {
        get_address(deviceId, apiAccessToken, apiEndpoint);
        console.info("User Address: ", address);
    }
};

app.post = function (request, response, type, exception) {
    if (exception) {
        console.error("An error occured: " + exception);

        response.clear().say(Messages.ERROR);
        switch (exception) {
            case 101:
                response.say(Messages.INVALID_APP_ID).send();
                break;
            default:
                break;
        }
    }

    console.info("Execution FINISHED - Alexa skill with APP_ID = " + request.applicationId);
};

app.launch(function (request, response) {

    console.info("Launch Event STARTED");

    response.say(Messages.WELCOME);
    response.shouldEndSession(false);

    console.info("Launch Event FINISHED");

});

app.intent(Intents.SURROUNDING_AREA, {
        "slots": {
            "Verkehrsmittel": Intents.S_A_SLOTS
        },
        "utterances": Intents.S_A_UTTERANCES
    },
    function (request, response) {

        console.info("Intent " + Intents.SURROUNDING_AREA + " STARTED");

        //Address permission not yet allowed
        if (typeof apiConsentToken === "undefined") {
            response.card({
                type: "AskForPermissionsConsent",
                permissions: Constants.PERMISSIONS
            });
            response.say("Es sieht so aus, als fehlt Viiv noch deine Adresse.");
            response.say("Sieh auf deiner Alexa App nach und erlaube die Freigabe deines Standortes," +
                " um Verkehrsmittel in deiner Nähe abzurufen.");
            response.shouldEndSession(false);
        } else {
            //DO SOMETHING
        }

        console.info("Intent " + Intents.SURROUNDING_AREA + " FINISHED");

    });

function get_address(deviceId, apiAccessToken, apiEndpoint) {

    console.info("Get Address STARTED");

    const options = {
        url: apiEndpoint + "/v1/devices/" + deviceId + "/settings/address",
        headers: {
            "Authorization": "Bearer " + apiAccessToken
        }
    };

    console.info("Get Address FINISHED");

    return new Promise((fullfill, reject) => {
        request(options, function (error, response, body) {
            console.info("Request - Get Address STARTED");
            console.info("Http Response Code: ", response.statusCode);

            if (!error && response.statusCode === 200) {
                address = JSON.parse(body);
                console.info("Address: ", address);
                fullfill(address);

            } else {
                reject(response.statusCode);
            }
            console.info("Request - Get Address FINISHED");
        });
    });

}

function build_wl_api_request() {

}

// Connect to lambda
exports.handler = app.lambda();
